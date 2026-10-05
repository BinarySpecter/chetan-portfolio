import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" index="09" title="Contact" meta="Open to opportunities">
      <p className="statement max-w-2xl">Let&apos;s build something.</p>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-mute">
        Open to internships, collaborations, and interesting problems.
      </p>

      <ul className="mt-9 max-w-2xl border-t border-rule">
        {site.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 border-b border-rule py-3.5"
            >
              <span className="tag-mono w-14 shrink-0 text-ink sm:w-16">{social.label}</span>
              <span aria-hidden="true" className="leader" />
              <span className="u-line tag-mono min-w-0 truncate text-mute transition-colors group-hover:text-accent-ink">
                {social.handle ?? social.label}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-mute transition-colors group-hover:text-accent-ink"
              >
                {social.href.startsWith("http") ? "\u2197" : "\u2192"}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
