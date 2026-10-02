'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import ChatRichText from '@/components/ChatRichText';

function messageText(message: UIMessage): string {
  const parts = message.parts ?? [];
  return parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('')
    .trim();
}

export default function MesloChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, status, open]);

  const starters = [
    'What does MESLO stand for?',
    'What is a Master Takeoff?',
    'Explain markup vs margin.',
    'How does MESLO improve operations?',
  ];
  const quickTopics = [
    { tag: '#estimating', prompt: 'Give me practical estimating tips I can apply this week.' },
    { tag: '#backoffice', prompt: 'How should I organize my back office workflows and handoffs?' },
    {
      tag: '#smallbiz',
      prompt: 'I run a small business. What are smart first steps to market my services locally?',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 flex h-[34rem] w-[24rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
          <div className="border-b bg-neutral-50 px-4 py-3">
            <div className="font-semibold text-neutral-900">MESLO Assistant</div>
            <div className="text-sm text-neutral-500">
              Ask about the book, estimating systems, or workflow discipline.
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-neutral-700">Try a question:</p>
                {starters.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      void sendMessage({ text: prompt });
                    }}
                    className="block w-full rounded-xl bg-neutral-100 px-3 py-2 text-left text-sm text-neutral-700 transition hover:bg-neutral-200"
                  >
                    {prompt}
                  </button>
                ))}
                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    Quick topics
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {quickTopics.map((topic) => (
                      <button
                        key={topic.tag}
                        type="button"
                        onClick={() => {
                          void sendMessage({ text: topic.prompt });
                        }}
                        className="rounded-full border border-[#64c4ff]/40 bg-[#64c4ff]/10 px-3 py-1.5 text-xs font-medium text-[#2f7ca9] transition hover:bg-[#64c4ff]/20"
                      >
                        {topic.tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div
                  className={
                    message.role === 'user'
                      ? 'max-w-[85%] rounded-2xl bg-neutral-900 px-3 py-2 text-sm text-white'
                      : 'max-w-[85%] rounded-2xl bg-neutral-100 px-3 py-2 text-sm text-neutral-900'
                  }
                >
                  <ChatRichText text={messageText(message)} />
                </div>
              </div>
            ))}

            {status === 'streaming' && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-neutral-100 px-3 py-2 text-sm text-neutral-500">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div className="border-t bg-white p-3">
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

            <div className="mt-3 rounded-xl bg-neutral-50 px-3 py-2 text-xs text-neutral-500">
              Built for book questions, estimating logic, and MESLO framework guidance.
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-black"
      >
        {open ? 'Close' : 'Chat'}
      </button>
    </div>
  );
}
