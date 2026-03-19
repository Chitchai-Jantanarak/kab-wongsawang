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
