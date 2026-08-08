-- database_setup.sql
-- Run this script in the Supabase SQL Editor to set up your database schema.

-- 1. Create the 'products' table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on 'products'
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read from 'products' (so customers can see the store)
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

-- Allow authenticated users (admin) to insert/update products
CREATE POLICY "Authenticated users can insert products" 
ON public.products FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" 
ON public.products FOR UPDATE 
TO authenticated 
USING (true);


-- 2. Create the 'orders' table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  status text DEFAULT 'Processing' NOT NULL,
  total_amount numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on 'orders'
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own orders
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Allow inserting orders (useful for webhook)
CREATE POLICY "Allow insert for orders" 
ON public.orders FOR INSERT 
TO authenticated 
WITH CHECK (true);


-- 3. Set up Storage Bucket for 'products' (if not already created)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'products' bucket
-- Allow public viewing of images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'products');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'products');
