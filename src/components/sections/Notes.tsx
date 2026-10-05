import { Section } from "@/components/ui/Section";
import { notes } from "@/content/notes";
import { site } from "@/content/site";

const statusLabels = {
  published: "read on X",
  draft: "draft",
  planned: "planned",
} as const;

export function Notes() {
  const published = notes.filter((note) => note.status === "published" && note.href);

  return (
    <Section
      id="notes"
      index="07"
      title="Things I’ve figured out"
      meta={published.length ? `${published.length} on X` : "Notes land on X"}
    >
      <p className="statement max-w-3xl">
        I write about things after I finally understand them.
      </p>

      <ul className="mt-9 border-t border-rule">
        {notes.map((note, index) => {
          const isPublished = note.status === "published" && Boolean(note.href);

          const inner = (
            <>
              <span className="tag-mono hidden text-faint sm:block">
                [ {String(index + 1).padStart(2, "0")} ]
              </span>
              <span className="min-w-0">
                <span
                  className={
                    isPublished
                      ? "block text-base font-medium text-ink transition-colors group-hover:text-accent-ink"
                      : "block text-base font-medium text-ink-soft"
                  }
                >
                  {note.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-mute">
                  {note.description}
                </span>
              </span>
              <span className="tag-mono flex shrink-0 items-center gap-3 text-[0.62rem] sm:justify-end">
                {note.topic ? <span className="text-faint">{note.topic}</span> : null}
                <span className={isPublished ? "text-ink" : "text-faint"}>
                  {statusLabels[note.status]}
                  {isPublished ? (
                    <span
                      aria-hidden="true"
                      className="ml-2 inline-block transition-transform group-hover:translate-x-1"
                    >
                      &#8599;
                    </span>
                  ) : null}
                </span>
              </span>
            </>
          );

          const rowClass =
            "grid items-baseline gap-x-6 gap-y-2 py-4 sm:grid-cols-[3.5rem_minmax(0,1fr)_11rem]";

          return (
            <li key={note.title} className="border-b border-rule">
              {isPublished ? (
                <a
                  href={note.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group ${rowClass}`}
                >
                  {inner}
                </a>
              ) : (
                <div className={rowClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={site.x}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 border border-rule px-4 py-2.5 tag-mono text-mute transition-colors hover:border-ink hover:text-ink"
        >
          follow on X
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            &#8599;
          </span>
        </a>
        <p className="text-sm leading-relaxed text-mute">
          These aren&apos;t written yet — topics I&apos;m working through.
        </p>
      </div>
    </Section>
  );
}
