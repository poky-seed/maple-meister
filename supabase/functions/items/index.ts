import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { JsonResponse } from "../_shared/responses.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

const ITEM_PATTERN = new URLPattern({ pathname: "/items/:id" });

Deno.serve(async (req) => {
  /*
   * ================================
   * OPTIONS PRE-FLIGHT REQUEST
   * ================================
   */
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  const url = new URL(req.url);
  const itemMatch = ITEM_PATTERN.exec(url.pathname);

  /*
   * ================================
   * GET /items
   * ================================
   */
  if (req.method === "GET" && !itemMatch) {
    const { data, error } = await supabase.from("items").select("*");
    if (error) {
      return JsonResponse({ error: error.message }, 500);
    }
    return JsonResponse(data);
  }

  /*
   * ================================
   * GET /items/:id
   * ================================
   */
  if (req.method === "GET" && itemMatch) {
    const itemId = itemMatch.pathname.groups.id!;
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("id", itemId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return JsonResponse({ error: "Item not found" }, 404);
      }
      return JsonResponse({ error: error.message }, 500);
    }
    return JsonResponse(data);
  }

  /*
   * ================================
   * METHOD NOT ALLOWED
   * ================================
   */
  return JsonResponse({ error: "Method not allowed" }, 405);
});
