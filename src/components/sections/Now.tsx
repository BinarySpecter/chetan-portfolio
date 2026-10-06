import { Section } from "@/components/ui/Section";
import { now } from "@/content/now";

export function Now() {
  return (
    <Section id="now" index="02" title="Now" meta="Updated as things change">
      <ul className="mt-9 border-t border-rule">
        {now.map((item) => (
          <li
            key={item.label}
            className="grid gap-2 border-b border-rule py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
          >
            <span className="tag-mono text-mute">{item.label}</span>
            <span className="min-w-0">
              <span className="block text-base leading-snug text-ink">{item.value}</span>
              {item.meta ? (
                <span className="tag-mono mt-1.5 block text-faint">{item.meta}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
