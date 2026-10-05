import { navItems } from "@/content/nav";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-rule">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="text-lg font-semibold uppercase tracking-[0.14em] text-ink">
              {site.name}
              <span className="text-ink">.</span>
            </p>
            <p className="mt-3 text-sm text-mute">Software &middot; AI &middot; Experiments</p>
            <p className="mono-label mt-2">{site.location}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5 md:items-end">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="u-line text-[0.7rem] uppercase tracking-[0.14em] text-mute transition-colors hover:text-accent-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-6">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="u-line font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute transition-colors hover:text-accent-ink"
            >
              {social.label}
            </a>
          ))}
          <a
            href="#top"
            className="u-line ml-auto font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute transition-colors hover:text-accent-ink"
          >
            Back to top &uarr;
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[0.66rem] tracking-[0.06em] text-faint">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.66rem] tracking-[0.06em] text-faint">
            Built by {site.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
