#!/bin/bash

# Apartment Booking System - Development Script
# Usage: ./scripts/dev.sh [frontend|backend|all]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
  echo -e "${GREEN}[DEV]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

check_requirements() {
  log "Checking requirements..."

  if ! command -v pnpm &> /dev/null; then
    error "pnpm not found. Install: npm install -g pnpm"
    exit 1
  fi

  if ! command -v docker &> /dev/null; then
    warn "Docker not found. PostgreSQL container won't be available."
  fi
}

start_database() {
  if command -v docker &> /dev/null; then
    log "Starting PostgreSQL container..."
    docker compose up -d postgres
    sleep 3
  fi
}

install_deps() {
  log "Installing dependencies..."
  pnpm install
}

dev_frontend() {
  log "Starting Frontend (Next.js)..."
  pnpm --filter frontend dev
}

dev_backend() {
  log "Starting Backend (NestJS)..."
  pnpm --filter backend start:dev
}

case "${1:-all}" in
  frontend)
    check_requirements
    dev_frontend
    ;;
  backend)
    check_requirements
    start_database
    dev_backend
    ;;
  all)
    check_requirements
    install_deps
    start_database
    log "Starting all services..."
    pnpm -r --parallel dev
    ;;
  *)
    echo "Usage: $0 [frontend|backend|all]"
    exit 1
    ;;
esac
