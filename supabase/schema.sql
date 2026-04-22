-- Tabla de participantes del sorteo Samsung
create table if not exists participantes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  nombre text not null,
  email text not null,
  telefono text not null,
  fecha_nacimiento date not null,
  numero_factura text not null,
  sucursal text not null,

  constraint participantes_email_unique unique (email),
  constraint participantes_factura_unique unique (numero_factura)
);

-- Row Level Security
alter table participantes enable row level security;

create policy "service_role_all" on participantes
  for all
  using (auth.role() = 'service_role');

create policy "allow_insert" on participantes
  for insert
  with check (true);

-- Índices
create index on participantes (email);
create index on participantes (numero_factura);
create index on participantes (created_at desc);
create index on participantes (sucursal);
