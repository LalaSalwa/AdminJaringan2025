# ← use the official Mongo image as base
FROM mongo:7.0

# ← copy your JSON and the import script into the init folder
COPY lessons.json                         /docker-entrypoint-initdb.d/lessons.json
COPY init-seed.sh                         /docker-entrypoint-initdb.d/01-init-seed.sh

# ← ensure your shell-script is executable
RUN chmod +x /docker-entrypoint-initdb.d/01-init-seed.sh
