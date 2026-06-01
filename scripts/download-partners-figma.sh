#!/usr/bin/env bash
# Descarga los logos de aliados certificados desde Figma.
# Ejecutar cuando la API no esté en rate limit (429).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/static/images"
TOKEN="$(grep -oP 'figma-api-key=\K[^"]+' "$HOME/.cursor/mcp.json")"
FILE_KEY="kMxcMN22scvnxxahKSTLN6"
BIN="$(command -v node)"

if [[ -z "$TOKEN" ]]; then
  echo "No se encontró figma-api-key en ~/.cursor/mcp.json" >&2
  exit 1
fi

declare -A NODES=(
  ["partner-finezza.png"]="5388:1265"
  ["partner-taupe.png"]="5388:1289"
  ["partner-stones-deco.png"]="5388:1253"
  ["partner-mob.png"]="5388:1229"
  ["partner-casazu.png"]="5388:1241"
)

IDS=$(IFS=,; echo "${NODES[*]}")
RESP=$(curl -sS -H "X-Figma-Token: $TOKEN" \
  "https://api.figma.com/v1/images/${FILE_KEY}?ids=${IDS}&format=png&scale=2")

if echo "$RESP" | grep -q '"status":429'; then
  echo "Figma API rate limit (429). Intenta más tarde." >&2
  exit 1
fi

for name in "${!NODES[@]}"; do
  id="${NODES[$name]}"
  url=$(echo "$RESP" | "$BIN" -e "const j=JSON.parse(process.argv[1]); console.log(j.images?.['$id']||'')" "$RESP")
  if [[ -z "$url" || "$url" == "null" ]]; then
    echo "Sin URL para $name ($id)" >&2
    continue
  fi
  curl -sSL "$url" -o "$OUT/$name"
  echo "OK $name"
done

echo "Listo."
