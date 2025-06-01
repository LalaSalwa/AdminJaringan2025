#!/usr/bin/env bash
set -e

echo "[init-seed.sh] Waiting for MongoDB to be ready..."

sleep 2

echo "[init-seed.sh] Importing lessons.json into ${MONGO_INITDB_DATABASE}.lessons..."

# Use mongoimport without explicit host and auth during init
mongoimport \
  --db "${MONGO_INITDB_DATABASE}" \
  --collection lessons \
  --drop \
  --jsonArray \
  --file /docker-entrypoint-initdb.d/lessons.json

echo "[init-seed.sh] Done."
