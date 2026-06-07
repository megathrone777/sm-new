import { type NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const data = (await request.json()) as object;

  console.info(data);

  return NextResponse.json({});
};
