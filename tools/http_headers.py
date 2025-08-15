#!/usr/bin/env python3
import sys, requests
if len(sys.argv) != 2:
    print("Usage: http_headers.py <url>")
    sys.exit(1)
r = requests.get(sys.argv[1])
for k,v in r.headers.items():
    print(f"{k}: {v}")
