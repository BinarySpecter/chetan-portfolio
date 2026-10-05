"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

export type CommandItem = {
  id: string;
  label: string;
  group: string;
  hint?: string;
  onSelect: () => void;
};

type CommandPaletteProps = {
  onClose: () => void;
  items: CommandItem[];
};

export function CommandPalette({ onClose, items }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.label} ${item.group} ${item.hint ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    const restore = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = previousOverflow;
      restore?.focus?.();
    };
  }, []);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = useCallback(
    (item: CommandItem | undefined) => {
      if (!item) return;
      onClose();
      item.onSelect();
    },
    [onClose],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(filtered[active]);
    } else if (event.key === "Tab") {
      event.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-center px-4 pb-4 pt-[12vh]"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink/35 backdrop-blur-[3px] motion-safe:animate-fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="relative w-full max-w-xl self-start border border-ink/70 bg-paper shadow-[0_24px_60px_-20px_rgba(0,0,0,0.4)] motion-safe:animate-fade-in"
      >
        <div className="flex items-center gap-3 border-b border-rule px-4">
          <span aria-hidden="true" className="font-mono text-xs text-faint">
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={filtered[active] ? `cmdk-${filtered[active].id}` : undefined}
            aria-label="Search sections and links"
            placeholder="Jump to a section or link…"
            autoComplete="off"
            spellCheck={false}
            className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-faint"
          />
          <button
            type="button"
            onClick={onClose}
            className="mono-label shrink-0 rounded-sm border border-rule px-2 py-1 transition-colors hover:border-ink hover:text-ink"
          >
            Esc
          </button>
        </div>

        <ul
          id="cmdk-list"
          ref={listRef}
          role="listbox"
          aria-label="Results"
          className="max-h-[52vh] overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-mute">No matches.</li>
          ) : (
            filtered.map((item, index) => (
              <li
                key={item.id}
                id={`cmdk-${item.id}`}
                data-index={index}
                role="option"
                aria-selected={index === active}
                onMouseMove={() => setActive(index)}
                onClick={() => run(item)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm",
                  index === active ? "bg-ink text-paper" : "text-ink-soft",
                )}
              >
                <span className="flex-1 truncate">{item.label}</span>
                {item.hint ? (
                  <span
                    className={cn(
                      "font-mono text-[0.65rem] uppercase tracking-[0.12em]",
                      index === active ? "text-paper/60" : "text-faint",
                    )}
                  >
                    {item.hint}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "font-mono text-[0.65rem] uppercase tracking-[0.12em]",
                    index === active ? "text-paper/60" : "text-faint",
                  )}
                >
                  {item.group}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
