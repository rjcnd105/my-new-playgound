import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { parseTokenCookie, tokenSchema } from "@/app/api/schema";

export async function POST(req: NextRequest) {
  const token = tokenSchema.parse(await req.json());

  const data = parseTokenCookie(token, { httpOnly: true });

  return NextResponse.json(null, {
    headers: {
      ...req.headers,
      "Set-Cookie": data,
    },
  });
}
