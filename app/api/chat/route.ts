import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  type UIMessage,
} from 'ai';
import { retrieveMesloContext } from '@/lib/retrieve-meslo';
import type { MesloLocale } from '@/lib/meslo-knowledge';

export const maxDuration = 30;

function extractLatestUserText(messages: UIMessage[]) {
  const latestUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!latestUser) return '';

  const withContent = latestUser as UIMessage & { content?: string };
  if (typeof withContent.content === 'string' && withContent.content.trim()) {
    return withContent.content.trim();
  }

  return (latestUser.parts ?? [])
    .map((part) => {
      if (part.type === 'text') return part.text;
      return '';
    })
    .join(' ')
    .trim();
}

function detectLocale(text: string): MesloLocale {
  const normalized = text.toLowerCase();

  if (
    /[¿¡áéíóúñ]/.test(normalized) ||
    /(que|como|explica|diferencia|estimacion|presupuesto|contratista|obra|margen|materiales)\b/.test(normalized)
  ) {
    return 'es';
  }

  return 'en';
}

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function extractPrompt(content: string) {
  const lines = content.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    if (!/^#{1,6}\s*prompt\s*$/i.test(lines[index]?.trim() ?? '')) continue;

    for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex += 1) {
      const candidate = lines[nextIndex]?.trim() ?? '';
      if (!candidate) continue;
      if (/^#{1,6}\s+/.test(candidate)) break;
      return candidate.replace(/^[-*]\s*/, '').trim();
    }
  }

  return '';
}

function stripPromptSection(content: string) {
  const lines = content.split('\n');
  const cleaned: string[] = [];
  let skippingPrompt = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^#{1,6}\s*prompt\s*$/i.test(trimmed)) {
      skippingPrompt = true;
      continue;
    }

    if (skippingPrompt) {
      if (!trimmed) continue;
      if (/^#{1,6}\s+/.test(trimmed)) {
        skippingPrompt = false;
        cleaned.push(line);
      }
      continue;
    }

    cleaned.push(line);
  }

  return cleaned.join('\n').trim();
}

function stripMarkdownHeadings(content: string) {
  return content
    .split('\n')
    .filter((line) => !/^#{1,6}\s+/.test(line.trim()))
    .join('\n')
    .trim();
}

function dedupeParagraphBodies(values: string[]) {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const value of values) {
    const normalized = collapseWhitespace(value).toLowerCase();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(value);
  }

  return unique;
}

function isMechaQuery(text: string) {
  return /\bwhat\s+is\s+mecha\b/i.test(text) || /\bque\s+es\s+mecha\b/i.test(text);
}

function isMesloDefinitionQuery(text: string) {
  return /^\s*(what\s+is\s+meslo|que\s+es\s+meslo)\s*\??\s*$/i.test(text);
}

function isToolkitQuery(text: string) {
  return /(starter toolkit|meslo toolkit|toolkit|bid log template|master takeoff worksheet|operations handbook template|business plan template)/i.test(
    text,
  );
}

function bookChapterTitles(
  docs: Awaited<ReturnType<typeof retrieveMesloContext>>,
  locale: MesloLocale,
) {
  const titles = docs
    .filter((doc) => doc.id.startsWith('book/'))
    .map((doc) => doc.title)
    .filter(Boolean);

  if (titles.length === 0) return '';

  const unique = [...new Set(titles)].slice(0, 2);
  return locale === 'es'
    ? `\n\nCapitulo relacionado: ${unique.join(' | ')}`
    : `\n\nRelated chapter: ${unique.join(' | ')}`;
}

const CURATED_FOLLOW_UPS: Array<{
  pattern: RegExp;
  prompts: string[];
}> = [
  {
    pattern:
      /(back office workflows|back office|handoffs|handoff|operations workflow|operationalizing the back office|domain registration|business email|operations handbook|business plan)/i,
    prompts: [
      'What is domain registration?',
      'How should I set up business email?',
      'What should go in a simple business plan?',
      'What should go in an operations handbook?',
    ],
  },
  {
    pattern:
      /(small business|market my services locally|local marketing|google business profile|local seo|marketing plan|email marketing|post on social media)/i,
    prompts: [
      'What should a small-business marketing plan include?',
      'How do I set up Google Business Profile for local marketing?',
      'How can I improve local SEO for my business?',
      'Is email marketing still useful for small businesses?',
    ],
  },
  {
    pattern:
      /(estimating tips|estimate|estimating|master takeoff|bid log|markup vs margin|scope leveling|takeoff|margin)/i,
    prompts: [
      'Explain a Master Takeoff.',
      'What is a bid log?',
      'What is markup vs margin?',
      'What is scope leveling?',
    ],
  },
  {
    pattern: /(starter toolkit|meslo toolkit|bid log template|master takeoff worksheet|operations handbook template|business plan template)/i,
    prompts: [
      'Where is the MESLO Starter Toolkit source copy?',
      'What should go in a simple business plan?',
      'What should go in an operations handbook?',
      'What is a bid log?',
    ],
  },
];

function curatedFollowUps(question: string) {
  const match = CURATED_FOLLOW_UPS.find((entry) => entry.pattern.test(question));
  return match?.prompts ?? [];
}

function followUpQuestions(
  question: string,
  docs: Awaited<ReturnType<typeof retrieveMesloContext>>,
  locale: MesloLocale,
) {
  const curated = curatedFollowUps(question);
  const fromDocs = docs.map((doc) => extractPrompt(doc.content)).filter(Boolean);
  const prompts = [...new Set([...curated, ...fromDocs])].slice(0, 4);
  if (prompts.length === 0) return '';

  const label = locale === 'es' ? 'Siguiente pregunta' : 'Follow-up question';
  return `\n\n${prompts.map((prompt) => `${label}: ${prompt}`).join('\n')}`;
}

function buildFallbackAnswer(question: string, docs: Awaited<ReturnType<typeof retrieveMesloContext>>, locale: MesloLocale) {
  if (docs.length === 0) {
    return locale === 'es'
      ? 'No tengo eso en los materiales internos todavia.'
      : "I don't have that in the internal materials yet.";
  }

  const topDocs = docs.slice(0, 2);
  const body = dedupeParagraphBodies(
    topDocs.map((doc) => {
      return collapseWhitespace(stripMarkdownHeadings(stripPromptSection(doc.content))).slice(0, 900);
    }),
  ).join('\n\n');
  const toolkitNote = isToolkitQuery(question)
    ? locale === 'es'
      ? '\n\nFuente del toolkit: /resources/starter-toolkit'
      : '\n\nToolkit source: /resources/starter-toolkit'
    : '';
  const chapterNote = bookChapterTitles(docs, locale);
  const followUpNote = followUpQuestions(question, docs, locale);

  return `${body}${chapterNote}${toolkitNote}${followUpNote}`;
}

function toAssistantStreamResponse(messages: UIMessage[], text: string) {
  const stream = createUIMessageStream({
    originalMessages: messages,
    execute: ({ writer }) => {
      const partId = 'fallback-text';
      writer.write({ type: 'start' });
      writer.write({ type: 'text-start', id: partId });
      writer.write({ type: 'text-delta', id: partId, delta: text });
      writer.write({ type: 'text-end', id: partId });
      writer.write({ type: 'finish', finishReason: 'stop' });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const latestUserText = extractLatestUserText(messages);
  const locale = detectLocale(latestUserText);

  if (isMechaQuery(latestUserText)) {
    return toAssistantStreamResponse(
      messages,
      locale === 'es' ? 'Siguiente pregunta: Que es MESLO?' : 'Follow-up question: What is MESLO?',
    );
  }

  if (isMesloDefinitionQuery(latestUserText)) {
    return toAssistantStreamResponse(
      messages,
      'MESLO is a structured estimating system that integrates Material, Equipment, Subcontractors, Labor, Other Costs, Insurance/Bond, Overhead, Profit and Taxes to minimize risk and maximize profits.',
    );
  }

  const docs = await retrieveMesloContext(latestUserText, 4, locale);
  const promptHints = [...new Set([...curatedFollowUps(latestUserText), ...docs.map((doc) => extractPrompt(doc.content)).filter(Boolean)])].slice(0, 4);
  const contextBlock = docs
    .map(
      (doc) =>
        `
ID: ${doc.id}
Title: ${doc.title}
Tags: ${doc.tags.join(', ') || 'none'}

${stripMarkdownHeadings(stripPromptSection(doc.content))}
`.trim(),
    )
    .join('\n\n---\n\n');
  const fallbackText = buildFallbackAnswer(latestUserText, docs, locale);
  const modelMessages = await convertToModelMessages(messages);

  if (!process.env.OPENAI_API_KEY) {
    return toAssistantStreamResponse(messages, fallbackText);
  }

  try {
    const result = streamText({
      model: openai(process.env.OPENAI_MODEL ?? 'gpt-4.1-mini'),
      system: `
You are MESLO Assistant for David Molina and the book The Principles of MESLO.

Rules:
- Answer from the provided source material first.
- Treat the provided source material as your highest-priority knowledge.
- If the answer is not supported by the source material, say:
  "I don't have that in the internal materials yet."
- Do not invent definitions, examples, pricing claims, chapter claims, or business facts.
- Use concise, practical language.
- Always respond in ${locale === 'es' ? 'Spanish' : 'English'}.
- When relevant to construction estimating, identify whether the issue is primarily Material, Equipment, Subcontractors, Labor, Other Costs, Insurance/Bond, Overhead, Profit, or Taxes.
- If asked about consulting, explain briefly and practically based on the provided material.
- Do not display source labels, bracketed citations, or raw IDs in the final response.
- If the source material comes from the book collection, you may cite the chapter title naturally at the end using a short phrase like "Related chapter: Materials" or "Related chapter: Operations and Permanent Delegation".
- If the user asks about the MESLO Starter Toolkit, MESLO Toolkit, Bid Log Template, Master Takeoff Worksheet, Operations Handbook Template, or Business Plan Template, include this exact link in the response: /resources/starter-toolkit
- When you include the toolkit link, present it as the source copy location for the templates.
- If relevant follow-up prompts are available, end your response with 1 to 4 short lines using this label:
  ${locale === 'es' ? '"Siguiente pregunta: ..."' : '"Follow-up question: ..."'}
- Prefer the recommended follow-up prompts below when they fit the user's question.
- Keep follow-up lines short and clickable as next-step questions.

SOURCE MATERIAL:
${contextBlock || 'No local source material matched the question.'}

RECOMMENDED FOLLOW-UP PROMPTS:
${promptHints.length > 0 ? promptHints.map((prompt) => `- ${prompt}`).join('\n') : 'None available.'}
`.trim(),
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return toAssistantStreamResponse(messages, fallbackText);
  }
}
