#!/usr/bin/env bash
set -e
TARGET="$1"
echo "[*] Pinging $TARGET..."
ping -c 2 "$TARGET" || true
echo "[*] Nmap quick scan..."
nmap -T4 -F "$TARGET" || true
echo "[*] Done."
