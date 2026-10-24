import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { navItems } from "@/content/nav";
import { recentActivity } from "@/content/activity";
import { ProcessDiagram } from "@/components/sections/ProcessDiagram";
import { OrbitalField } from "@/components/ui/OrbitalField";
import { StatusDot } from "@/components/ui/Primitives";

const profile = [
  { label: "Location", value: site.location },
  { label: "Studying", value: site.degree },
  { label: "Institution", value: site.school },
];

const lat = `${site.coordinates.lat.toFixed(4)} N`;
const lon = `${site.coordinates.lon.toFixed(4)} E`;

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
          <div className="relative lg:flex lg:flex-col lg:pt-1">
            <ol
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 top-1/2 hidden -translate-y-1/2 flex-col gap-[1.1rem] xl:flex"
            >
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className="flex items-center gap-2.5 font-mono text-[0.56rem] font-medium tracking-[0.14em] text-faint"
                >
                  <span className={index === 0 ? "text-accent-ink" : undefined}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`h-px w-[1.15rem] ${index === 0 ? "bg-accent" : "bg-rule"}`}
                  />
                </li>
              ))}
            </ol>

            <p className="rise-in tag-mono flex items-center gap-3 text-accent-ink" style={delay(20)}>
              <span aria-hidden="true" className="inline-block h-px w-8 bg-accent" />
              {site.eyebrow}
            </p>

            <h1
              className="clip-in mt-5 font-serif text-[clamp(2.5rem,6.4vw,4.1rem)] font-normal leading-[1.02] tracking-[-0.02em] text-ink"
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

            <figure
              aria-label="Abstract ASCII study of an orbital wireframe"
              className="rise-in relative mt-7 lg:mt-4 lg:flex lg:min-h-[10rem] lg:flex-1 lg:flex-col"
              style={delay(390)}
            >
              <div className="orbital-stage relative h-[clamp(10rem,40vw,14rem)] w-full overflow-hidden lg:h-auto lg:min-h-[10rem] lg:flex-1">
                <OrbitalField className="absolute inset-0" />

                <span
                  aria-hidden="true"
                  className="tag-mono pointer-events-none absolute left-2 top-2 text-[0.55rem] text-faint"
                >
                  fig. 01
                </span>
                <span
                  aria-hidden="true"
                  className="tag-mono pointer-events-none absolute right-2 top-2 hidden text-[0.55rem] text-faint sm:block"
                >
                  ascii / wireframe
                </span>

                <span
                  aria-hidden="true"
                  className="reg-mark pointer-events-none absolute bottom-2.5 right-2.5 opacity-70"
                />
                <span
                  aria-hidden="true"
                  className="reg-mark pointer-events-none absolute right-8 top-2.5 hidden opacity-50 sm:block"
                />

                <dl className="geo-stamp pointer-events-none absolute bottom-2.5 left-2.5 hidden sm:grid">
                  <dt>X</dt>
                  <dd>{lat}</dd>
                  <dt>Y</dt>
                  <dd>{lon}</dd>
                  <dt>Z</dt>
                  <dd>{site.year}</dd>
                </dl>
              </div>
            </figure>

            <ul
              className="rise-in mt-6 flex flex-wrap gap-x-6 gap-y-2 lg:mt-5"
              style={delay(400)}
            >
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

          <div className="rise-in" style={delay(460)}>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="panel-caption">profile.sys</span>
              <span aria-hidden="true" className="panel-cells">
                <span />
                <span />
                <span />
              </span>
            </div>

            <aside
              aria-label="Profile, recent activity, and working process"
              className="panel border border-rule"
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
                  <span className="text-right text-[0.82rem] font-medium leading-snug text-ink">{row.value}</span>
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
                        <span className="min-w-0 pb-2.5 text-[0.82rem] font-medium leading-snug text-ink-soft">
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
      </div>
    </section>
  );
}
