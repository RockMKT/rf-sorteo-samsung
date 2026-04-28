-- Tabla de códigos de cupón válidos
CREATE TABLE IF NOT EXISTS coupon_codes (
  id    SERIAL PRIMARY KEY,
  code  VARCHAR(15) UNIQUE NOT NULL
);

-- Tabla de participantes del sorteo Samsung
CREATE TABLE IF NOT EXISTS raffle_participants (
  id            SERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  date_of_birth DATE,
  coupon_code   VARCHAR(15) UNIQUE NOT NULL,
  subsidiary    TEXT
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_coupon_codes_code ON coupon_codes (code);
CREATE INDEX IF NOT EXISTS idx_raffle_participants_coupon ON raffle_participants (coupon_code);
CREATE INDEX IF NOT EXISTS idx_raffle_participants_email ON raffle_participants (email);
CREATE INDEX IF NOT EXISTS idx_raffle_participants_created ON raffle_participants (created_at DESC);
