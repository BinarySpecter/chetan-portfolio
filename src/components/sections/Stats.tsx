import { Reveal } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats } from "@/content/stats";

export function Stats() {
  return (
    <section aria-label="By the numbers" className="shell pb-14 pt-9 sm:pb-16">
      <Reveal>
        <div className="grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="panel flex flex-col gap-3.5 px-5 py-6">
              <span aria-hidden="true" className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-accent" />
                <span className="h-px w-5 bg-accent opacity-60" />
              </span>

              <span className="font-serif text-4xl leading-none tabular-nums text-ink sm:text-5xl">
                <StatCounter value={stat.value} />
                {stat.suffix ? <span>{stat.suffix}</span> : null}
              </span>

              <span className="flex flex-col gap-1">
                <span className="tag-mono text-[0.66rem] text-ink">{stat.label}</span>
                {stat.sub ? (
                  <span className="text-[0.78rem] leading-snug text-mute">{stat.sub}</span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
