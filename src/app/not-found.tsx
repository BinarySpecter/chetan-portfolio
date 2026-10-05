import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-24">
      <p className="mono-label">Error 404</p>
      <h1 className="mt-6 text-display font-medium leading-[0.95] tracking-[-0.04em] text-ink">
        Not found
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-mute">
        That page doesn&apos;t exist. The link may be old, or I may have moved something around.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          Back home
          <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
    </section>
  );
}
