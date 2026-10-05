import { currentFocus, currentStrip } from "@/content/current";

export function CurrentStrip() {
  return (
    <section aria-label="Current status" className="border-y border-rule bg-surface">
      <div className="shell flex flex-wrap items-center gap-x-8 gap-y-3 py-3.5">
        <a
          href={currentFocus.href}
          className="group inline-flex items-center gap-2 tag-mono text-[0.62rem] text-ink transition-colors hover:text-accent-ink"
        >
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-accent motion-safe:animate-[pulse-dot_2.6s_ease-in-out_infinite]"
          />
          {currentFocus.label}
          <span className="hidden text-ink-soft sm:inline">&mdash; {currentFocus.value}</span>
          <span
            aria-hidden="true"
            className="text-faint transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          >
            &#8594;
          </span>
        </a>

        <span aria-hidden="true" className="hidden h-4 w-px bg-rule md:block" />

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {currentStrip.map((item) => (
            <li key={item.label} className="tag-mono flex items-center gap-2 text-[0.62rem]">
              <span className="text-faint">{item.label}</span>
              <span className="text-mute">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
