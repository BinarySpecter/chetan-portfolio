import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Software, AI & open source`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function loadFont(file: string): ArrayBuffer {
  const data = readFileSync(join(process.cwd(), "node_modules/geist/dist/fonts", file));
  return new Uint8Array(data).buffer as ArrayBuffer;
}

export default function OpengraphImage() {
  const sans = loadFont("geist-sans/Geist-Regular.ttf");
  const sansSemibold = loadFont("geist-sans/Geist-SemiBold.ttf");
  const mono = loadFont("geist-mono/GeistMono-Regular.ttf");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1ea",
          color: "#161512",
          padding: "72px 80px",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Geist Mono",
            fontSize: 21,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8a6d3b",
          }}
        >
          <span>Software · AI · Open source</span>
          <span style={{ color: "#6f6d68" }}>chittori.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 104, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.04em" }}>
            Chetan Chittori
          </div>
          <div style={{ fontSize: 36, color: "#3a3833", letterSpacing: "-0.01em" }}>
            Developer interested in software, AI, and how things work.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #ccc9c3",
            paddingTop: 26,
          }}
        >
          <div style={{ fontSize: 25, color: "#6f6d68", maxWidth: 760, lineHeight: 1.4 }}>
            I build software, experiment with AI, and contribute to open source.
          </div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 21, color: "#6f6d68" }}>
            B.Tech IT · Delhi
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist", data: sansSemibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
