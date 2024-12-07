#!/bin/bash

# Check if required environment variables are set
REQUIRED_VARS=("DB_HOST" "DB_PORT" "DB_NAME" "DB_USER" "DB_PASSWORD")

# Iterate over the required variables and check if they are set
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "Error: Missing required environment variable: $var"
    exit 1
  fi
done

# If all variables are set, print a success message
echo "All required environment variables are set."
