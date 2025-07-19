CREATE POLICY "Only admin can upload item images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'item-images' AND
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Only admin can update item images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'item-images' AND
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Only admin can delete item images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'item-images' AND
  (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Anyone can view item images"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'item-images');