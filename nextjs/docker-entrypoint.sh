#!/bin/bash

status_file="./scrapingStatus.txt"
desired_status="databaseReady"

# Wait until the desired status is set in the file
while [ ! -f "$status_file" ] || [ "$(cat "$status_file")" != "$desired_status" ]; do
  sleep 1
done

echo "Desired status '$desired_status' reached. Proceeding..."