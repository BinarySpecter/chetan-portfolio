"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { navItems } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { CommandPalette, type CommandItem } from "./CommandPalette";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const visibility = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibility.set(entry.target.id, entry.isIntersecting);
        const first = ids.find((id) => visibility.get(id));
        if (first) setActive(first);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      window.localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="flex size-8 items-center justify-center text-mute transition-colors hover:text-accent-ink"
    >
      <svg className="dark:hidden" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <svg className="hidden dark:block" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export function SiteHeader() {
  const ids = useMemo(() => navItems.map((item) => item.href.slice(1)), []);
  const active = useActiveSection(ids);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = useCallback((href: string) => {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setPaletteOpen(true);
      } else if (event.key === "Escape") {
        setPaletteOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands: CommandItem[] = useMemo(
    () => [
      ...navItems.map((item) => ({
        id: `nav-${item.href.slice(1)}`,
        label: item.label,
        group: "Section",
        hint: item.href,
        onSelect: () => go(item.href),
      })),
      ...site.socials.map((social) => ({
        id: `social-${social.label.toLowerCase()}`,
        label: social.label,
        group: "Link",
        hint: social.handle,
        onSelect: () => {
          if (social.href.startsWith("http")) window.open(social.href, "_blank", "noopener");
          else window.location.href = social.href;
        },
      })),
    ],
    [go],
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
        <div className="shell flex h-16 items-center gap-6">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent-ink sm:text-[0.78rem] sm:tracking-[0.16em]"
          >
            {site.name}
            <span className="text-ink">.</span>
          </a>

          <nav aria-label="Primary" className="ml-auto hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    go(item.href);
                  }}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "border-b border-transparent pb-0.5 text-[0.7rem] uppercase tracking-[0.14em] transition-[color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "border-accent-ink text-ink" : "text-mute hover:text-ink",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open search"
              className="hidden font-mono text-[0.7rem] tracking-[0.08em] text-mute transition-colors hover:text-accent-ink sm:block"
            >
              &#8984;K
            </button>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open search"
              className="flex size-8 items-center justify-center text-mute transition-colors hover:text-accent-ink sm:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
                <path d="m20 20-4.2-4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex size-8 items-center justify-center text-mute transition-colors hover:text-accent-ink md:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                ) : (
                  <path d="M3.5 7h17M3.5 12h17M3.5 17h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-rule bg-paper md:hidden">
            <ul className="shell flex flex-col py-1">
              {navItems.map((item) => {
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        setMenuOpen(false);
                        go(item.href);
                      }}
                      className="flex items-center justify-between border-b border-rule py-3.5 text-[0.72rem] uppercase tracking-[0.14em] text-ink"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-faint">
                        {item.href}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </header>

      {paletteOpen ? (
        <CommandPalette onClose={() => setPaletteOpen(false)} items={commands} />
      ) : null}
    </>
  );
}
