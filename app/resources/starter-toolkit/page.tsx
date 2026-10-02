import ResourcesCopyPanel from '@/components/ResourcesCopyPanel';

export default function StarterToolkitPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b7d63d]">
        MESLO Starter Toolkit
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Copy Source Toolkit</h1>
      <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-300">
        This page holds the actual copy source for the MESLO Starter Toolkit. It mirrors the
        toolkit source experience used on the landing page.
      </p>
      <div className="mt-10 rounded-[2rem] border border-[#b7d63d]/20 bg-white/5 p-8">
        <ResourcesCopyPanel />
      </div>
    </main>
  );
}
