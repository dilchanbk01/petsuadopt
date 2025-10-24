-- Add owner details to pets table (only visible to admins)
ALTER TABLE public.pets 
ADD COLUMN owner_name TEXT,
ADD COLUMN owner_phone TEXT;