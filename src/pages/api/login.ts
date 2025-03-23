// src/pages/api/login.ts
import { createServerClient } from "@supabase/ssr";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return new Response("Parámetros inválidos", { status: 400 });
  }

  const supabase = createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookies.get(name)?.value;
        },
        set(name, value, options) {
          cookies.set(name, value, options);
        },
        remove(name, options) {
          cookies.delete(name, options);
        },
      },
    }
  );

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return new Response(`Error: ${error.message}`, { status: 401 });
  }

  // Redirige al dashboard si todo va bien
  return redirect("/dashboard");
};
