CREATE TABLE IF NOT EXISTS orders (
  gateway_order_id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  environment TEXT NOT NULL,
  provider_checkout_session_id TEXT,
  provider_order_id TEXT,
  app TEXT NOT NULL,
  sku TEXT NOT NULL,
  reference_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  currency TEXT NOT NULL,
  amount_total TEXT,
  status TEXT NOT NULL,
  buyer_email TEXT,
  entitlement_token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  paid_at TEXT,
  refunded_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_reference ON orders(app, sku, reference_id);
CREATE INDEX IF NOT EXISTS idx_orders_provider_order ON orders(provider, provider_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status, created_at);

CREATE TABLE IF NOT EXISTS webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  gateway_order_id TEXT,
  payload TEXT NOT NULL,
  received_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_order ON webhook_events(gateway_order_id, received_at);
