CREATE POLICY "Only admin can upload world logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'world-logos' AND
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Only admin can update logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'world-logos' AND
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Only admin can delete logos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'world-logos' AND
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Anyone can view world logos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'world-logos' );