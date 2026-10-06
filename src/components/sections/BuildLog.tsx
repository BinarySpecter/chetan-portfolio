import { Section } from "@/components/ui/Section";
import { Disclosure } from "@/components/ui/Disclosure";
import { Reveal } from "@/components/ui/Reveal";
import { experiments } from "@/content/experiments";
import { buildLog } from "@/content/buildLog";

export function BuildLog() {
  const mergedCount = buildLog.filter((entry) => entry.href).length;

  return (
    <Section
      id="build-log"
      index="06"
      title="Build log"
      meta={`${buildLog.length} entries · ${mergedCount} merged`}
    >
      <div className="mt-9">
        <span className="tag-mono text-faint">[ in the lab ]</span>
        <ul className="mt-4 border-t border-rule">
          {experiments.map((experiment) => (
            <li
              key={experiment.name}
              className="grid gap-2 border-b border-rule py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-10"
            >
              <div className="min-w-0">
                <p className="text-base font-medium text-ink">
                  {experiment.href ? (
                    <a
                      href={experiment.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-accent-ink"
                    >
                      {experiment.name}
                      <span
                        aria-hidden="true"
                        className="text-xs transition-transform group-hover:translate-x-1"
                      >
                        &#8599;
                      </span>
                    </a>
                  ) : (
                    experiment.name
                  )}
                </p>
                <p className="tag-mono mt-2 text-[0.62rem] text-faint">{experiment.category}</p>
              </div>
              <p className="text-sm leading-relaxed text-mute">{experiment.summary}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <span className="tag-mono text-faint">[ log ]</span>
        <div className="mt-4 border-t border-rule">
          {buildLog.map((entry, index) => (
            <Reveal key={`${entry.date}-${entry.title}`} delay={index * 45}>
              <Disclosure
                summary={
                <span className="flex w-full items-baseline gap-4">
                  <span className="tag-mono flex w-[5.5rem] shrink-0 items-center gap-2 text-[0.62rem] text-mute">
                    <span aria-hidden="true" className="h-px w-2.5 shrink-0 bg-rule-strong" />
                    {entry.date}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium text-ink transition-colors group-hover:text-accent-ink">
                    {entry.title}
                  </span>
                  {entry.repo ? (
                    <span className="tag-mono hidden max-w-[16rem] shrink-0 truncate text-[0.62rem] text-faint md:block">
                      {entry.repo.split("/")[0]}
                    </span>
                  ) : null}
                </span>
              }
            >
              <div className="sm:pl-[6.5rem]">
                {entry.body ? (
                  <p className="max-w-2xl text-sm leading-relaxed text-mute">{entry.body}</p>
                ) : null}

                {entry.repo ? (
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={`https://github.com/${entry.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag-mono text-[0.62rem] text-mute transition-colors hover:text-accent-ink"
                    >
                      {entry.repo}
                    </a>
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 tag-mono text-[0.62rem] text-faint transition-colors hover:text-accent-ink"
                      >
                        view pull request
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover/link:translate-x-1"
                        >
                          &#8599;
                        </span>
                      </a>
                    ) : null}
                  </div>
                ) : null}

                {entry.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="tag-mono text-[0.62rem] text-faint">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              </Disclosure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
