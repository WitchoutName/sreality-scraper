#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e


echo "Waiting for the app to start"
# Wait for the db to be up, if we know where it is.
# ./wait-for-it.sh "app:8080"
# Run the main container command.
# exec "tail -F anything"

exec "$@"