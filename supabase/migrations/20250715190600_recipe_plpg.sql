-- =================================================================
-- Function: get_recipes
-- =================================================================
CREATE OR REPLACE FUNCTION get_recipes()
RETURNS JSON AS $$
BEGIN
  RETURN (
    SELECT JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', r.id,
        'name', r .name,
        'type', r.recipe_type,
        'resultItemImageUrl', COALESCE(i.image_url, '')
      )
    )
    FROM recipes AS r
    JOIN items AS i ON r.result_item_id = i.id
    ORDER BY r.id
  );
END;
$$ LANGUAGE plpgsql;

-- =================================================================
-- Function: get_recipe_by_id
-- =================================================================
CREATE OR REPLACE FUNCTION get_recipe_by_id(recipe_id bigint)
RETURNS JSON AS $$
DECLARE
  recipe_data JSON;
  materials_data JSON;
  result_item_data JSON;
BEGIN

  -- RECIPE INFO
  SELECT JSON_BUILD_OBJECT(
    'id', r.id,
    'name', r.name,
    'type', r.recipe_type,
    'resultQuantity', r.result_quantity
  )
  INTO recipe_data
  FROM recipes r
  WHERE r.id = recipe_id;

  IF recipe_data IS NULL THEN
    RETURN NULL;
  END IF;

  -- RESULT ITEM INFO
  SELECT JSON_BUILD_OBJECT(
    'id', i.id,
    'name', i.name,
    'type', i.item_type,
    'imageUrl', COALESCE(i.image_url, '')
  )
  INTO result_item_data
  FROM recipes r
  JOIN items i ON r.result_item_id = i.id
  WHERE r.id = recipe_id;

  -- MATERIAL ITEMS INFO
  SELECT JSON_AGG(
    JSON_BUILD_OBJECT(
      'item', json_build_object(
        'id', i.id,
        'name', i.name,
        'type', i.item_type,
        'imageUrl', COALESCE(i.image_url, '')
      ),
      'quantity', rm.item_quantity
    )
  )
  INTO materials_data
  FROM recipe_materials rm
  JOIN items i ON rm.item_id = i.id
  WHERE rm.recipe_id = recipe_id
  ORDER BY i.name;

  IF materials_data IS NULL THEN
    materials_data := '[]'::JSON;
  END IF;

  -- FINAL RESULT
  RETURN JSON_BUILD_OBJECT(
    'id', (recipe_data->>'id')::BIGINT,
    'name', recipe_data->>'name',
    'type', recipe_data->>'type',
    'materials', materials_data,
    'resultItem', result_item_data,
    'resultQuantity', (recipe_data->>'resultQuantity')::INT
  );
END;
$$ LANGUAGE plpgsql;

-- =================================================================
-- Function: get_recipes_by_item
-- =================================================================
CREATE OR REPLACE FUNCTION get_recipes_by_item(item_id bigint)
RETURNS JSON AS $$
BEGIN
  RETURN (
    SELECT JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', r.id,
        'name', r.name,
        'type', r.recipe_type,
        'requiredQuantity', rm.item_quantity
      )
    )
    FROM recipe_materials rm
    JOIN recipes r ON rm.recipe_id = r.id
    WHERE rm.item_id = item_id
    ORDER BY r.name
  );
END;
$$ LANGUAGE plpgsql;

-- =================================================================
-- Comments for documentation
-- =================================================================
COMMENT ON FUNCTION get_recipes() IS 'API: GET /recipes - 레시피 목록 조회';
COMMENT ON FUNCTION get_recipe_by_id(bigint) IS 'API: GET /recipes/{recipeId} - 레시피 상세 조회';
COMMENT ON FUNCTION get_recipes_by_item(bigint) IS 'UTIL: 특정 아이템을 사용하는 레시피 목록 조회'; 