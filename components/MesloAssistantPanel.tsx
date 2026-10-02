'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import ChatRichText from '@/components/ChatRichText';
import {
  detectToolkitResources,
  RESOURCE_LABEL,
  RESOURCE_TEXT,
  type ResourceKey,
} from '@/components/ResourcesCopyPanel';

function messageText(message: UIMessage): string {
  const parts = message.parts ?? [];
  return parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('')
    .trim();
}

function parseAssistantResponse(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return { body: '', ctas: [] as string[] };

  const lines = trimmed.split('\n');
  const bodyLines: string[] = [];
  const ctas: string[] = [];
  let expectingPrompt = false;

  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) {
      if (!expectingPrompt) bodyLines.push(line);
      continue;
    }

    if (/^#{1,6}\s*prompt\s*$/i.test(cleanLine)) {
      expectingPrompt = true;
      continue;
    }

    const followUpMatch = cleanLine.match(
      /^(follow-up question|siguiente pregunta|do you mean|quisiste decir)[\s:,-]+(.+\?)$/i,
    );
    if (followUpMatch) {
      ctas.push(followUpMatch[2].trim());
      expectingPrompt = false;
      continue;
    }

    if (expectingPrompt && cleanLine.endsWith('?')) {
      ctas.push(cleanLine.replace(/^[-*]\s*/, '').trim());
      expectingPrompt = false;
      continue;
    }

    bodyLines.push(line);
    expectingPrompt = false;
  }

  if (bodyLines.filter((line) => line.trim()).length === 0 && trimmed.length <= 120 && trimmed.endsWith('?')) {
    ctas.push(trimmed);
  }

  return {
    body: bodyLines.join('\n').trim(),
    ctas: [...new Set(ctas)],
  };
}

type MesloAssistantPanelProps = {
  initialPrompt?: string;
};

export default function MesloAssistantPanel({ initialPrompt }: MesloAssistantPanelProps) {
  const [input, setInput] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);
  const promptedRef = useRef(false);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, status]);

  useEffect(() => {
    if (!initialPrompt || promptedRef.current || messages.length > 0) return;
    promptedRef.current = true;
    void sendMessage({ text: initialPrompt });
  }, [initialPrompt, messages.length, sendMessage]);

  async function copyToolkitSource(resource: ResourceKey) {
    await navigator.clipboard.writeText(RESOURCE_TEXT[resource]);
    setCopyStatus(`${RESOURCE_LABEL[resource]} copied.`);
    window.setTimeout(() => setCopyStatus(''), 1400);
  }

  return (
    <section className="flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-black/20 lg:min-h-0">
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
        <div className="text-sm font-semibold text-neutral-950">MESLO Assistant</div>
        <div className="text-xs text-neutral-500">
          Ask about the book, templates, estimating, or operations.
        </div>
      </div>

      <div className="border-b border-neutral-200 bg-white p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            void sendMessage({ text: input });
            setInput('');
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask MESLO Assistant..."
            className="flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500"
          />
          <button
            type="submit"
            className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-amber-300"
          >
            Send
          </button>
        </form>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-neutral-50 px-4 py-3">
        {messages.length === 0 ? (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm ring-1 ring-black/5">
              Hi. I am the MESLO Assistant. Ask about The Principles of MESLO, Master Takeoff,
              templates, or workflow discipline.
            </div>
          </div>
        ) : null}

        {messages.map((message) => (
          (() => {
            const text = messageText(message);
            const parsedAssistant = message.role === 'assistant' ? parseAssistantResponse(text) : null;
            const renderedText = parsedAssistant ? parsedAssistant.body : text;
            const ctas = parsedAssistant?.ctas ?? [];
            const toolkitResources =
              message.role === 'assistant' ? detectToolkitResources(`${renderedText}\n${ctas.join('\n')}`) : [];

            return (
              <div key={message.id} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    message.role === 'user'
                      ? 'max-w-[85%] rounded-2xl bg-neutral-950 px-3 py-2 text-sm text-white'
                      : 'max-w-[85%] rounded-2xl bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm ring-1 ring-black/5'
                  }
                >
                  {renderedText ? (
                    <div className="leading-6">
                      <ChatRichText text={renderedText} />
                    </div>
                  ) : null}
                  {ctas.length > 0 ? (
                    <div className={renderedText ? 'mt-3 flex flex-wrap gap-2' : 'flex flex-wrap gap-2'}>
                      {ctas.map((cta) => (
                        <button
                          key={cta}
                          type="button"
                          onClick={() => {
                            void sendMessage({ text: cta });
                          }}
                          className="rounded-full border border-[#64c4ff]/40 bg-[#64c4ff]/10 px-3 py-1.5 text-left text-xs font-semibold text-[#2f7ca9] transition hover:bg-[#64c4ff]/20"
                        >
                          {cta}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {toolkitResources.length > 0 ? (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {toolkitResources.map((resource) => (
                        <button
                          key={resource}
                          type="button"
                          onClick={() => {
                            void copyToolkitSource(resource);
                          }}
                          className="rounded-full border border-[#b7d63d]/40 bg-[#b7d63d]/10 px-3 py-1.5 text-left text-xs font-semibold text-[#6d8707] transition hover:bg-[#b7d63d]/20"
                        >
                          Copy Source: {RESOURCE_LABEL[resource]}
                        </button>
                      ))}
                      <a
                        href="/resources/starter-toolkit"
                        className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-200"
                      >
                        Open Copy Source Toolkit
                      </a>
                    </div>
                  ) : null}
                  {toolkitResources.length > 0 && copyStatus ? (
                    <div className="mt-2 text-xs font-medium text-[#6d8707]">{copyStatus}</div>
                  ) : null}
                </div>
              </div>
            );
          })()
        ))}

        {status === 'streaming' ? (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl bg-white px-3 py-2 text-sm text-neutral-500 shadow-sm ring-1 ring-black/5">
              Thinking...
            </div>
          </div>
        ) : null}

        <div ref={endRef} />
      </div>
    </section>
  );
}
