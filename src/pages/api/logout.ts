// src/pages/api/logout.ts
import { createServerClient } from "@supabase/ssr";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(key) {
          return cookies.get(key)?.value;
        },
        set(key, value, options) {
          cookies.set(key, value, options);
        },
        remove(key, options) {
          cookies.delete(key, options);
        },
      },
    }
  );

  await supabase.auth.signOut();
  return redirect("/");
};
