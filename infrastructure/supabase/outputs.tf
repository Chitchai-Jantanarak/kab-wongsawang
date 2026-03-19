output "project_id" {
  description = "The Supabase project ID"
  value       = supabase_project.main.id
}

output "project_ref" {
  description = "The Supabase project reference"
  value       = supabase_project.main.project_ref
}

output "database_url" {
  description = "The database connection URL"
  value       = "postgresql://postgres:${var.database_password}@aws-0-${var.region}.pooler.supabase.com:6543/postgres?sslmode=require"
  sensitive   = true
}

output "api_url" {
  description = "The Supabase API URL"
  value       = "https://${var.project_ref}.supabase.co"
}

output " anon_key" {
  description = "The Supabase anonymous key"
  value       = supabase_project.main.settings.anon_key
  sensitive   = true
}
