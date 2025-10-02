-- Verify and strengthen RLS policies for adoption_requests table
-- This ensures sensitive personal information (names, emails, phones, addresses) is protected

-- First, ensure RLS is enabled (should already be, but being explicit)
ALTER TABLE public.adoption_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them with explicit security
DROP POLICY IF EXISTS "Anyone can create adoption requests" ON public.adoption_requests;
DROP POLICY IF EXISTS "Admins can view all adoption requests" ON public.adoption_requests;
DROP POLICY IF EXISTS "Admins can update adoption requests" ON public.adoption_requests;
DROP POLICY IF EXISTS "Admins can delete adoption requests" ON public.adoption_requests;

-- Recreate policies with explicit security guarantees

-- Policy 1: Allow anonymous users to submit adoption requests (INSERT only)
-- This is needed for the public adoption form to work
CREATE POLICY "Anyone can submit adoption requests"
ON public.adoption_requests
FOR INSERT
TO public
WITH CHECK (true);

-- Policy 2: Only admins can view adoption requests (protects PII)
-- This prevents unauthorized access to personal information
CREATE POLICY "Only admins can view adoption requests"
ON public.adoption_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Policy 3: Only admins can update adoption requests
CREATE POLICY "Only admins can update adoption requests"
ON public.adoption_requests
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Policy 4: Only admins can delete adoption requests
CREATE POLICY "Only admins can delete adoption requests"
ON public.adoption_requests
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));