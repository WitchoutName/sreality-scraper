#!/bin/bash

status_file="./status/scrapingStatus"


echo "Waiting for the scraper to initialize the database"
# Wait until the desired status is set in the file

while true; do
    value=$(cat "$status_file")

    if [[ $value == "1" || $value == "2" ]]; then
        break
    else
        sleep 1
    fi
done

echo "Ready. Proceeding..."


# Run the main container command.
npm run build && exec "$@"