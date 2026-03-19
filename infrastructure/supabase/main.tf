terraform {
  required_version = ">= 1.0.0"

  required_providers {
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

provider "supabase" {
  version = "~> 1.0"
}

variable "project_ref" {
  description = "Supabase project reference ID"
  type        = string
}

variable "database_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "Supabase region"
  type        = string
  default     = "us-east-1"
}

resource "supabase_project" "main" {
  name       = "apartment-booking"
  project_ref = var.project_ref
  database_password = var.database_password
  region     = var.region

  settings {
    jwt_secret           = var.database_password
    site_url             = "http://localhost:3000"
    uri                  = "postgresql://postgres:${var.database_password}@db.${var.project_ref}.supabase.net:5432/postgres"
    server_port          = 5432
    server_host          = "db.${var.project_ref}.supabase.net"
    max_connections      = 10
    pool_mode            = "session"
    ssl_mode             = "require"
  }
}

output "project_id" {
  value = supabase_project.main.id
}

output "project_ref" {
  value = supabase_project.main.project_ref
}

output "database_url" {
  value     = "postgresql://postgres:${var.database_password}@aws-0-${var.region}.pooler.supabase.com:6543/postgres?sslmode=require"
  sensitive = true
}

output "api_url" {
  value = "https://${var.project_ref}.supabase.co"
}
