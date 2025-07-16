ALTER TABLE public.worlds
ADD COLUMN logo TEXT;

COMMENT ON COLUMN public.worlds.logo IS 'URL for the world logo image.';
