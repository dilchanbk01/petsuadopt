-- Add new column for multiple images
ALTER TABLE pets ADD COLUMN images jsonb DEFAULT '[]'::jsonb;

-- Migrate existing image_url data to images array
UPDATE pets 
SET images = CASE 
  WHEN image_url IS NOT NULL AND image_url != '' 
  THEN jsonb_build_array(image_url)
  ELSE '[]'::jsonb
END
WHERE images = '[]'::jsonb;

-- Drop the old image_url column
ALTER TABLE pets DROP COLUMN image_url;