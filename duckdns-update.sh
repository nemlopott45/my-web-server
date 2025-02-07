#!/bin/bash
# DuckDNS frissítés szkript
echo "Frissítem a DuckDNS domaint..."
curl "https://www.duckdns.org/update?domains=myserver&token=YOUR_DUCKDNS_API_TOKEN&ip="
