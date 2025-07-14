import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { JsonResponse } from "../_shared/responses.ts";

const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
);

Deno.serve(async (req) => {
    /*
     * ================================
     * OPTIONS PRE-FLIGHT REQUEST
     * ================================
     */
    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204 });
    }

    /*
     * ================================
     * GET /worlds
     * ================================
     */
    if (req.method === "GET") {
        const { data, error } = await supabase.from("worlds").select("*");
        if (error) {
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
