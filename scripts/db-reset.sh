#!/bin/bash

# Database Reset Script
# Usage: ./scripts/db-reset.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

log() {
  echo -e "${GREEN}[DB]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

log "Resetting database..."

cd apps/backend

log "Pushing schema to database..."
pnpm prisma:db:push

log "Generating Prisma client..."
pnpm prisma:generate

log "Database reset complete!"

echo ""
log "To seed data: pnpm prisma:seed"
