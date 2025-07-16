ALTER TABLE public.worlds
ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

COMMENT ON COLUMN public.worlds.id IS 'Changed to an auto-generating identity column.';
