import { ImageResponse } from "next/og";

// Build-time social-share card (1200×630). Static-export friendly: rendered to a
// PNG at build with system fonts (no network font fetch).
export const dynamic = "force-static";
export const alt =
  "Ramen Protokol Field Lab — AI-assisted software delivery, tested in public.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0b0c",
          backgroundImage:
            "linear-gradient(#0e1113 1px, transparent 1px), linear-gradient(90deg, #0e1113 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              border: "2px solid #2e3438",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                border: "4px solid #3fb950",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#e7eaeb", fontSize: "26px", fontWeight: 700, letterSpacing: "2px" }}>
              RAMEN PROTOKOL
            </div>
            <div style={{ color: "#3fb950", fontSize: "16px", letterSpacing: "10px" }}>
              FIELD LAB
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#f3f6f6", fontSize: "66px", fontWeight: 700, lineHeight: 1.05 }}>
            AI-assisted software delivery,
          </div>
          <div style={{ color: "#3fb950", fontSize: "66px", fontWeight: 700, lineHeight: 1.05 }}>
            tested in public.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#646b6f",
            fontSize: "22px",
            letterSpacing: "1px",
          }}
        >
          <span>github.com/ramenprotokol</span>
          <span style={{ display: "flex", alignItems: "center", gap: "12px", color: "#3fb950" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#3fb950" }} />
            ALL EVIDENCE PUBLIC
          </span>
        </div>
      </div>
    ),
    size,
  );
}
