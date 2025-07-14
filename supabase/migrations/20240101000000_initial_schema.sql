-- =================================================================
-- users table
-- Public user data. Authentication is handled by Supabase Auth.
-- The `id` column should be linked to `auth.users.id`.
-- =================================================================
CREATE TABLE public.users (
    id UUID PRIMARY KEY,
    username TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES public.users(id),
    updated_by UUID REFERENCES public.users(id)
);
COMMENT ON TABLE public.users IS 'Public user data, linked to Supabase auth.';

-- =================================================================
-- worlds table
-- MapleStory worlds.
-- =================================================================
CREATE TABLE public.worlds (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES public.users(id),
    updated_by UUID REFERENCES public.users(id)
);
COMMENT ON TABLE public.worlds IS 'Represents MapleStory worlds.';

-- =================================================================
-- items table
-- All items that can be crafted or used as materials.
-- =================================================================
CREATE TABLE public.items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE,
    item_type TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES public.users(id),
    updated_by UUID REFERENCES public.users(id)
);
COMMENT ON TABLE public.items IS 'Craftable items and materials.';

-- =================================================================
-- recipes table
-- Crafting recipes for items.
-- =================================================================
CREATE TABLE public.recipes (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    result_item_id BIGINT NOT NULL REFERENCES public.items(id),
    result_quantity INT NOT NULL,
    recipe_type TEXT NOT NULL,
    required_level INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES public.users(id),
    updated_by UUID REFERENCES public.users(id)
);
COMMENT ON TABLE public.recipes IS 'Crafting recipes.';

-- =================================================================
-- recipe_materials table (Join Table)
-- Materials required for each recipe.
-- =================================================================
CREATE TABLE public.recipe_materials (
    recipe_id BIGINT NOT NULL REFERENCES public.recipes(id),
    item_id BIGINT NOT NULL REFERENCES public.items(id),
    item_quantity INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES public.users(id),
    updated_by UUID REFERENCES public.users(id),
    PRIMARY KEY (recipe_id, item_id)
);
COMMENT ON TABLE public.recipe_materials IS 'Join table for recipes and their required materials.';

-- =================================================================
-- user_item_prices table
-- Prices for items submitted by users.
-- =================================================================
CREATE TABLE public.user_item_prices (
    user_id UUID NOT NULL REFERENCES public.users(id),
    item_id BIGINT NOT NULL REFERENCES public.items(id),
    world_id INT NOT NULL REFERENCES public.worlds(id),
    recorded_at TIMESTAMPTZ NOT NULL,
    price BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES public.users(id),
    updated_by UUID REFERENCES public.users(id),
    PRIMARY KEY (user_id, item_id, world_id, recorded_at)
);
COMMENT ON TABLE public.user_item_prices IS 'Item prices submitted by individual users.';

-- =================================================================
-- official_prices table
-- Aggregated item prices (e.g., hourly average).
-- =================================================================
CREATE TABLE public.official_prices (
    item_id BIGINT NOT NULL REFERENCES public.items(id),
    world_id INT NOT NULL REFERENCES public.worlds(id),
    recorded_at TIMESTAMPTZ NOT NULL,
    price BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES public.users(id),
    updated_by UUID REFERENCES public.users(id),
    PRIMARY KEY (item_id, world_id, recorded_at)
);
COMMENT ON TABLE public.official_prices IS 'Official, aggregated item prices for each world.';

-- =================================================================
-- RLS (Row Level Security) Policies
-- IMPORTANT: Enable RLS on all tables and define policies for security.
-- Leaving this as a reminder. You should secure your tables.
-- Example for a public table:
--   ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
--   CREATE POLICY "Allow public read access" ON public.items FOR SELECT USING (true);
-- ================================================================= 