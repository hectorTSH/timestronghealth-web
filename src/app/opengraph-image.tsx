import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Time Strong Health — in-home fitness for older adults in Atlanta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo-wordmark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          color: "#0a0a0a",
        }}
      >
        <div style={{ width: 16, height: "100%", background: "#F7931A" }} />
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: 56,
            padding: "48px 64px 48px 56px",
          }}
        >
          <img src={logoSrc} width={390} height={318} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 54,
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: -0.5,
              }}
            >
              In-home fitness for older adults in Atlanta
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 28,
                lineHeight: 1.35,
                color: "#3f3f3f",
              }}
            >
              {"Parkinson's fitness · Buckhead · Midtown · Sandy Springs · Woodstock"}
            </div>
            <div
              style={{
                marginTop: 36,
                fontSize: 26,
                fontWeight: 700,
                color: "#F7931A",
              }}
            >
              timestronghealth.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
