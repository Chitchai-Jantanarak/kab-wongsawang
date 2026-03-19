#!/bin/bash

# Test Script - Run tests across all workspaces
# Usage: ./scripts/test.sh [frontend|backend|all]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
  echo -e "${GREEN}[TEST]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

test_frontend() {
  log "Running Frontend tests..."
  pnpm --filter frontend test
}

test_backend() {
  log "Running Backend tests..."
  pnpm --filter backend test
}

case "${1:-all}" in
  frontend)
    test_frontend
    ;;
  backend)
    test_backend
    ;;
  all)
    test_frontend
    echo ""
    test_backend
    ;;
  *)
    echo "Usage: $0 [frontend|backend|all]"
    exit 1
    ;;
esac

log "All tests complete!"
