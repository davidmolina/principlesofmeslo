import MesloAssistantPanel from '@/components/MesloAssistantPanel';

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function AssistantPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const initialPrompt = typeof q === 'string' ? q.trim() : '';
  const examplePrompts = [
    'What is MESLO?',
    'Explain a Master Takeoff.',
    'How should I organize my back office folders?',
    'What is a bid log?',
  ];
  const quickTopics = [
    {
      tag: '#estimating',
      prompt: 'Give me practical estimating tips I can apply this week.',
    },
    {
      tag: '#backoffice',
      prompt: 'How should I organize my back office workflows and handoffs?',
    },
    {
      tag: '#smallbiz',
      prompt: 'I run a small business. What are smart first steps to market my services locally?',
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-4 lg:h-[calc(100vh-4.5rem)] lg:px-6 lg:py-5">
      <div className="flex h-full flex-col gap-4">
        <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-5 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-[2rem]">
                MESLO Assistant
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-[#c6d4dd]">
                Ask about the book, estimating systems, operations workflow, and bid strategy.
              </p>
            </div>
            <p className="max-w-md text-sm text-[#9fb6c7] lg:text-right">
              Toolkit source:{' '}
              <a href="/resources/starter-toolkit" className="text-[#9fd8ff] underline underline-offset-4">
                /resources/starter-toolkit
              </a>
            </p>
          </div>
        </section>

        <div className="grid flex-1 gap-4 lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_290px]">
          <MesloAssistantPanel initialPrompt={initialPrompt} />

          <aside className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 lg:min-h-0">
            <div className="grid gap-4 lg:h-full lg:grid-rows-[auto_1fr]">
              <section>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64c4ff]">
                  Quick topics
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {quickTopics.map((topic) => (
                    <a
                      key={topic.tag}
                      href={`/assistant?q=${encodeURIComponent(topic.prompt)}`}
                      className="rounded-full border border-[#64c4ff]/40 bg-[#64c4ff]/10 px-3 py-1.5 text-xs font-semibold text-[#9fd8ff] transition hover:bg-[#64c4ff]/20"
                    >
                      {topic.tag}
                    </a>
                  ))}
                </div>
              </section>

              <section className="lg:min-h-0">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b7d63d]">
                  Example prompts
                </div>
                <div className="mt-3 grid gap-2">
                  {examplePrompts.map((prompt) => (
                    <a
                      key={prompt}
                      href={`/assistant?q=${encodeURIComponent(prompt)}`}
                      className="rounded-2xl border border-white/10 bg-[#0a1e2a]/80 px-4 py-3 text-sm text-[#d2dce4] transition hover:border-white/20 hover:bg-[#102839]"
                    >
                      {prompt}
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
