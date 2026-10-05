import { Hero } from "@/components/sections/Hero";
import { CurrentStrip } from "@/components/sections/CurrentStrip";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Now } from "@/components/sections/Now";
import { Work } from "@/components/sections/Work";
import { Projects } from "@/components/sections/Projects";
import { OpenSource } from "@/components/sections/OpenSource";
import { BuildLog } from "@/components/sections/BuildLog";
import { Notes } from "@/components/sections/Notes";
import { Personal } from "@/components/sections/Personal";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <CurrentStrip />
      <Stats />
      <About />
      <Now />
      <Work />
      <Projects />
      <OpenSource />
      <BuildLog />
      <Notes />
      <Personal />
      <Contact />
    </>
  );
}
