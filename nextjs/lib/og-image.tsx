import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

// Shared by app/opengraph-image.tsx and app/twitter-image.tsx — both files
// re-export this default so social/AI crawlers always get a real branded
// preview image instead of falling back to the square logo.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "linear-gradient(135deg, #1a3dcc 0%, #2b5ce6 55%, #4d78f0 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "white",
            }}
          />
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: 920,
          }}
        >
          Join the team behind the care
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "rgba(255,255,255,0.82)" }}>
          Careers at {siteConfig.name} · Gurugram
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            marginTop: 56,
            fontSize: 24,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.stats.surgeries} surgeries</div>
          <div style={{ display: "flex" }}>{siteConfig.stats.patientsTreated} patients treated</div>
          <div style={{ display: "flex" }}>{siteConfig.stats.successRate} success rate</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
