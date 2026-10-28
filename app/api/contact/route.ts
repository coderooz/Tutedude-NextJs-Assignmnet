
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  const body = await req.json();

  return Response.json({
    message: "Hello from Next.js API Route!",
    data: body,
  });
}