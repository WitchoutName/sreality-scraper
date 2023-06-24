#!/bin/bash

# migrate the database
npm run migrate:deploy

# Start the nextjs application
exec "$@"