DROP FUNCTION IF EXISTS public.get_recipes();
DROP FUNCTION IF EXISTS public.get_recipe_by_id(bigint);
DROP FUNCTION IF EXISTS public.get_recipes_by_item(bigint);

ALTER TABLE public.worlds RENAME COLUMN logo TO logo_path;
ALTER TABLE public.items RENAME COLUMN image_url TO image_path;

UPDATE public.worlds
SET logo_path = SUBSTRING(logo_path FROM 'world-logos/(.*)$')
WHERE logo_path LIKE 'https://%.supabase.co/%/world-logos/%';