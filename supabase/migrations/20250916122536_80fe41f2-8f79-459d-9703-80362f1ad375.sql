-- Create adoption_requests table
CREATE TABLE public.adoption_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
  adopter_name TEXT NOT NULL,
  adopter_email TEXT NOT NULL,
  adopter_phone TEXT NOT NULL,
  adopter_address TEXT,
  adoption_reason TEXT,
  experience_with_pets TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.adoption_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for adoption requests
CREATE POLICY "Anyone can create adoption requests" 
ON public.adoption_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all adoption requests" 
ON public.adoption_requests 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update adoption requests" 
ON public.adoption_requests 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete adoption requests" 
ON public.adoption_requests 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_adoption_requests_updated_at
BEFORE UPDATE ON public.adoption_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();