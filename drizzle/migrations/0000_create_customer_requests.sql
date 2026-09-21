CREATE TABLE public.customer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL CHECK (request_type IN ('consultoria', 'contato')),
  name text,
  email text,
  length text NOT NULL,
  weight text NOT NULL,
  color text,
  goal text NOT NULL,
  recommended_product_id text,
  recommended_product_name text,
  recommendation_reason text,
  recommendation_tip text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.customer_requests TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customer_requests TO service_role;

ALTER TABLE public.customer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit customer requests"
ON public.customer_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(length) BETWEEN 3 AND 8
  AND char_length(weight) BETWEEN 3 AND 8
  AND char_length(goal) BETWEEN 3 AND 80
  AND (name IS NULL OR char_length(name) BETWEEN 2 AND 100)
  AND (email IS NULL OR char_length(email) BETWEEN 5 AND 254)
);

CREATE INDEX customer_requests_created_at_idx
ON public.customer_requests (created_at DESC);