#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
supabase_dir="$(cd "$script_dir/.." && pwd)"
db_url="${SUPABASE_LOCAL_DB_URL:-postgresql://postgres:postgres@127.0.0.1:54322/postgres}"

for schema_file in "$supabase_dir"/schema/*.sql; do
  echo "Applying ${schema_file#$supabase_dir/}"
  psql "$db_url" --set ON_ERROR_STOP=1 --file "$schema_file"
done
