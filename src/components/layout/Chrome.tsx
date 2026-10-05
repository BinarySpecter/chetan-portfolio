export function ScrollProgress() {
  return <div aria-hidden="true" className="progress-bar" />;
}

export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-[110] rounded-sm border border-ink bg-paper px-4 py-2 text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}

export function ThemeInitScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
