#!/bin/sh
set -e

# Check if a migration message was provided
if [ -z "$1" ]; then
    echo "Error: Please provide a migration message."
    echo "Usage: ./migrate.sh \"your description here\""
    exit 1
fi

MESSAGE="$1"

echo "Generating migration script for: '$MESSAGE'..."
alembic revision --autogenerate -m "$MESSAGE"

echo "Applying migration to database..."
alembic upgrade head

echo "Migration successfully applied!"