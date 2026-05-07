
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text not null unique,
  customer_email text,
  customer_name text,
  subtotal_cents integer not null default 0,
  discount_cents integer not null default 0,
  shipping_cents integer not null default 0,
  tax_cents integer not null default 0,
  total_cents integer not null default 0,
  currency text not null default 'usd',
  status text not null default 'paid',
  shipping_address jsonb,
  environment text not null default 'sandbox',
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_name text not null,
  scent text,
  size_label text,
  unit_price_cents integer not null,
  quantity integer not null default 1,
  line_total_cents integer not null,
  created_at timestamptz not null default now()
);

create index idx_order_items_order on public.order_items(order_id);
create index idx_orders_session on public.orders(stripe_session_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public read by stripe_session_id (used by the thank-you page)
create policy "Anyone can view an order by session id"
  on public.orders for select
  using (true);

create policy "Anyone can view items for any order"
  on public.order_items for select
  using (true);

-- Only service role writes (the webhook)
create policy "Service role manages orders"
  on public.orders for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role manages order items"
  on public.order_items for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
