#!/usr/bin/env bash
# Descarga las imágenes del carousel Materiales desde Figma.
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
  ["material-altos-brillos.png"]="5388:1410"
  ["material-aluminio.png"]="5388:1421"
  ["material-laca.png"]="5388:1431"
  ["material-chapa-madera.png"]="5330:4205"
  ["material-hpl.png"]="5330:4703"
  ["material-lite-super-mate.png"]="5330:4704"
  ["material-lite-texturas.png"]="5330:4705"
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

# Melamina: exportar manualmente desde Figma si hay nodo dedicado
echo "Listo. Revisa material-melamina.png (sin nodo en script; exportar manual si aplica)."
