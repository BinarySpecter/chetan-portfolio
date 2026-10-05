import { Section } from "@/components/ui/Section";
import { personal } from "@/content/personal";

export function Personal() {
  return (
    <Section id="off-the-clock" index="08" title="Off the clock" meta="Not everything is code">
      <ul className="grid max-w-3xl gap-x-12 sm:grid-cols-2">
        {personal.map((item) => (
          <li key={`${item.label}-${item.value}`} className="border-b border-rule py-3.5">
            <span className="tag-mono block text-[0.62rem] text-faint">{item.label}</span>
            <span className="mt-1.5 block text-sm text-ink">{item.value}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
