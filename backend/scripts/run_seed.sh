#!/bin/sh
set -e  # Exit immediately if a command exits with a non-zero status

python3 -m scripts.seed.seed_db
