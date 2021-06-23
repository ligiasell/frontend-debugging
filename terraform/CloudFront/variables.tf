
# Variables
// This file contains the type and description of used variables
variable "bucket" {
  description = "Origin S3 Bucket"
  type = object({
    bucket_regional_domain_name = string,
    arn                         = string,
    id                          = string,
  })
}
// Remove variables below if you don't have a domain
variable "certificate_arn" {
  description = "Certificate ARN"
  type        = string
}
// Remove variables below if you don't have a domain
variable "aliases" {
  description = "Custom domain aliases"
  type        = list(string)
}
