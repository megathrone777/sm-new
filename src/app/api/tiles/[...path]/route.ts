import { type NextRequest, NextResponse } from "next/server";

const TILE_BASE = "https://tiles.openfreemap.org";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
): Promise<NextResponse> => {
  const { path } = await params;
  const joined = path.join("/");
  const url = `${TILE_BASE}/${joined}`;

  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!response.ok) {
    return new NextResponse(null, { status: response.status });
  }

  const contentType = response.headers.get("Content-Type") ?? "";

  if (joined.startsWith("styles/") && contentType.includes("json")) {
    const style = await response.json();

    for (const source of Object.values(style.sources ?? {}) as Record<string, unknown>[]) {
      if (typeof source.url === "string" && source.url.startsWith(TILE_BASE)) {
        source.url = source.url.replace(TILE_BASE, "/api/tiles");
      }

      if (Array.isArray(source.tiles)) {
        source.tiles = (source.tiles as string[]).map((t) =>
          t.startsWith(TILE_BASE) ? t.replace(TILE_BASE, "/api/tiles") : t,
        );
      }
    }

    return NextResponse.json(style, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  }

  const body = await response.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": contentType || "application/octet-stream",
    },
  });
};
