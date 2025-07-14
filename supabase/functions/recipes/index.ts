import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { JsonResponse } from "../_shared/responses.ts";

const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
);

const RECIPE_PATTERN = new URLPattern({ pathname: "/recipes/:id" });

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
    const recipeMatch = RECIPE_PATTERN.exec(url.pathname);

    /*
     * ================================
     * GET /recipes
     * ================================
     */
    if (req.method === "GET" && !recipeMatch) {
        const { data, error } = await supabase
            .from("recipes")
            .select(
                "id, name, type, resultItem:items!result_item_id(image_url)",
            );

        if (error) {
            return JsonResponse({ error: error.message }, 500);
        }
        const formattedRecipes = (data as any[]).map((r) => ({
            id: r.id,
            name: r.name,
            type: r.type,
            resultItemImageUrl: r.resultItem?.image_url || null,
        }));

        return JsonResponse(formattedRecipes);
    }

    /*
     * ================================
     * GET /recipes/:id
     * ================================
     */
    if (req.method === "GET" && recipeMatch) {
        const recipeId = recipeMatch.pathname.groups.id!;
        const { data, error } = await supabase
            .from("recipes")
            .select(`
          id,
          name,
          type,
          result_quantity,
          resultItem:items!result_item_id(id, name, type, image_url),
          materials:recipe_materials(
            quantity,
            item:items!item_id(id, name, type, image_url)
          )
        `)
            .eq("id", recipeId)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return JsonResponse({ error: "Recipe not found" }, 404);
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
