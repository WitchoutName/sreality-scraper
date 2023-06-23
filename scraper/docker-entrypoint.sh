#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

echo "Waiting for the db to start"
# Wait for the db to be up, if we know where it is.
if [ -n "$CUSTOMERS_HOST" ]; then
  ./wait-for-it.sh "db:${DB_PORT:-6000}"
fi

# Run the main container command.
exec "$@"