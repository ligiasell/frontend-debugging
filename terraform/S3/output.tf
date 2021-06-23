# Output
// This file describes what's going to be returned by the s3.tf
// In this case it returns the created S3 bucket to be used during
// cloudfront configuration
output "bucket" {
  description = "Created bucket"
  value       = aws_s3_bucket.bucket
}
