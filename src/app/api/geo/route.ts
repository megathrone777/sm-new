import { type NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const data = await request.json();

  console.info(data);

  return NextResponse.json({
    Hello: "OK",
  });
};
