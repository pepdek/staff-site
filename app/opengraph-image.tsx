import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site-wide fallback OG image — Next.js applies this to every route that
// doesn't define its own more specific opengraph-image, so every page
// gets a real preview image with no per-page asset work.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#10151F",
          color: "#F7F5EF",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 600 }}>Meridian</div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#A9AEB8" }}>
          Same price as the Philippines. Awake when you need us.
        </div>
      </div>
    ),
    { ...size }
  );
}
