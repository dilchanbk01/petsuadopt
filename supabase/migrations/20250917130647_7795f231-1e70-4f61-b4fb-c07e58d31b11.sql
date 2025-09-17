-- Create hero_banners table for swipable banner management
CREATE TABLE public.hero_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

-- Create policies for hero banners
CREATE POLICY "Anyone can view active hero banners" 
ON public.hero_banners 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage hero banners" 
ON public.hero_banners 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_hero_banners_updated_at
BEFORE UPDATE ON public.hero_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default hero banner
INSERT INTO public.hero_banners (title, subtitle, cta_text, cta_link, display_order) 
VALUES ('Find Your Perfect Companion', 'Connect with loving pets in need of homes. Every adoption saves a life and creates an unbreakable bond.', 'Browse Pets', '/', 0);