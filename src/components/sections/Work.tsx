import { Section } from "@/components/ui/Section";
import { Disclosure } from "@/components/ui/Disclosure";
import { Tag } from "@/components/ui/Primitives";
import { work } from "@/content/work";

export function Work() {
  return (
    <Section
      id="work"
      index="03"
      title="Work"
      meta={`${work.length} role${work.length === 1 ? "" : "s"}`}
    >
      <p className="statement max-w-3xl">Applied experience.</p>

      <div className="mt-9 border-t border-rule">
        {work.map((entry, index) => (
          <Disclosure
            key={`${entry.org}-${entry.period}`}
            summary={
              <span className="flex w-full items-baseline gap-4">
                <span className="tag-mono hidden text-faint sm:block">
                  [ {String(index + 1).padStart(2, "0")} ]
                </span>
                <span className="min-w-0 flex-1 text-base font-medium text-ink transition-colors group-hover:text-accent-ink">
                  {entry.org} · {entry.role}
                </span>
                <span className="mono-label shrink-0">
                  {entry.period}
                  {entry.location ? ` · ${entry.location}` : ""}
                </span>
              </span>
            }
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] lg:gap-12">
              <div className="min-w-0">
                <p className="text-sm leading-relaxed text-ink-soft">{entry.summary}</p>
                {entry.points?.length ? (
                  <ul className="mt-5 flex flex-col gap-2">
                    {entry.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-mute">
                        <span aria-hidden="true" className="mt-[0.5em] h-px w-3 shrink-0 bg-rule-strong" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {entry.stack?.length ? (
                <div className="flex flex-wrap gap-1.5 lg:justify-end">
                  {entry.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              ) : null}
            </div>
          </Disclosure>
        ))}
      </div>
    </Section>
  );
}
