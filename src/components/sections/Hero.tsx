import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { recentActivity } from "@/content/activity";
import { ProcessDiagram } from "@/components/sections/ProcessDiagram";
import { StatusDot } from "@/components/ui/Primitives";

const profile = [
  { label: "Location", value: site.location },
  { label: "Studying", value: site.degree },
  { label: "Institution", value: site.school },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatActivity(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return `${MONTHS[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, "0")}`;
}

function delay(ms: number) {
  return { animationDelay: `${ms}ms` } as CSSProperties;
}

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative scroll-mt-24 overflow-hidden">
      <div aria-hidden="true" className="paper-grid pointer-events-none absolute inset-0 opacity-70" />
      <span
        aria-hidden="true"
        className="reg-mark pointer-events-none absolute left-7 top-28 hidden lg:block"
      />
      <span
        aria-hidden="true"
        className="reg-mark pointer-events-none absolute bottom-20 right-12 hidden lg:block"
      />

      <div className="shell relative pb-7 pt-14 sm:pt-16 lg:pb-9 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-stretch lg:gap-14">
          <div className="lg:flex lg:flex-col lg:pt-1">
            <p className="rise-in tag-mono flex items-center gap-3 text-accent-ink" style={delay(20)}>
              <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
              {site.eyebrow}
            </p>

            <h1
              className="clip-in mt-5 font-serif text-[clamp(2.5rem,6.4vw,4.1rem)] leading-[1.02] tracking-[-0.02em] text-ink"
              style={delay(110)}
            >
              {site.firstName} {site.lastName}
            </h1>

            <p className="statement mt-5 max-w-xl">
              <span className="rise-in block" style={delay(210)}>
                I build AI developer tools
              </span>
              <span className="rise-in block" style={delay(270)}>
                and ship{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">web apps that work</span>
                  <span
                    aria-hidden="true"
                    className="highlight-wash absolute inset-x-[-0.18em] bottom-[0.05em] top-[0.16em] z-0 rounded-[2px] bg-accent-wash"
                    style={delay(380)}
                  />
                </span>
                .
              </span>
            </p>

            <p
              className="rise-in mt-5 max-w-lg text-base leading-relaxed text-mute"
              style={delay(330)}
            >
              B.Tech IT student in Delhi. Next.js, TypeScript, Python.
            </p>

            <ul className="rise-in mt-6 flex flex-wrap gap-x-6 gap-y-2 lg:mt-auto lg:pt-8" style={delay(400)}>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="u-line group inline-flex items-center gap-1.5 tag-mono text-mute transition-colors hover:text-accent-ink"
                  >
                    {social.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      {social.href.startsWith("http") ? "\u2197" : "\u2192"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <aside
            aria-label="Profile, recent activity, and working process"
            className="rise-in panel border border-rule"
            style={delay(460)}
          >
            <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2.5">
              <span className="tag-mono text-faint">profile</span>
              <span className="tag-mono text-mute">{site.year}</span>
            </div>

            {profile.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-5 border-b border-rule px-4 py-3"
              >
                <span className="mono-label shrink-0">{row.label}</span>
                <span className="text-right text-[0.82rem] leading-snug text-ink">{row.value}</span>
              </div>
            ))}

            <div className="flex items-center justify-between gap-5 border-b border-rule px-4 py-3">
              <span className="mono-label">Status</span>
              <StatusDot label={site.status.label} />
            </div>

            <div className="px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <span className="tag-mono text-faint">recent activity</span>
                <a
                  href="#build-log"
                  className="u-line group inline-flex items-center gap-1.5 tag-mono text-[0.6rem] text-faint transition-colors hover:text-accent-ink"
                >
                  view all
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    &#8599;
                  </span>
                </a>
              </div>

              <ol className="mt-3 flex flex-col">
                {recentActivity.map((item, index) => {
                  const isLast = index === recentActivity.length - 1;
                  return (
                    <li
                      key={item.label}
                      className="rise-in grid grid-cols-[3.4rem_0.9rem_minmax(0,1fr)] items-start"
                      style={delay(540 + index * 45)}
                    >
                      <span className="tag-mono pt-[0.35rem] text-[0.6rem] text-faint">
                        {formatActivity(item.date)}
                      </span>
                      <span className="relative flex justify-center">
                        <span
                          className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent motion-safe:animate-[activity-pulse_2.8s_ease-in-out_infinite]"
                          style={{ animationDelay: `${index * 340}ms` }}
                        />
                        {!isLast ? (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-[-0.45rem] top-[1rem] w-px bg-rule"
                          />
                        ) : null}
                      </span>
                      <span className="min-w-0 pb-2.5 text-[0.82rem] leading-snug text-ink-soft">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent-ink"
                          >
                            {item.label}
                          </a>
                        ) : (
                          item.label
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="rise-in border-t border-rule" style={delay(760)}>
              <ProcessDiagram />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
