import { getExploreUsersBySearch } from "@/lib/prisma/db";
import { createClient } from "@/lib/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const requestUrl = new URL(req.url);
  const search = requestUrl.searchParams.get("search");

  const supabase = createClient(cookies());
  const data = await getExploreUsersBySearch(supabase, search);
  return NextResponse.json(data);
};
