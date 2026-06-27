#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
supabase_dir="$(cd "$script_dir/.." && pwd)"

supabase db reset --local --workdir "$supabase_dir"
bash "$script_dir/apply-static-schema.sh"
