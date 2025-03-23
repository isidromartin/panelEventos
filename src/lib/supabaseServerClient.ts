// src/lib/supabaseServerClient.ts
import { createServerClient } from "@supabase/ssr";
import type { APIContext } from "astro";
import { parse } from "cookie";

export function createSupabaseServerClient(Astro: APIContext) {
  const request = Astro.request;

  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          const cookieHeader = request.headers.get("cookie") ?? "";
          const parsed = parse(cookieHeader);
          return parsed[name];
        },
        set() {},
        remove() {},
      },
    }
  );
}
