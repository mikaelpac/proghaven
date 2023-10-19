import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase-server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
/* import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"; */
