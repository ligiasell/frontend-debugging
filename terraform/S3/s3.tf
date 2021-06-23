# S3
// This file configures a S3 bucket considering a single page application (SPA)
// because we use React in Frontend.
// This configuration blocks all public access so that only cloudfront can access it
// It also configures the entry point and error to our index.html
resource "aws_s3_bucket" "bucket" {
  bucket        = "${var.project}-frontend-${terraform.workspace}"
  acl           = "private"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "bucket_public_access_block" {
  bucket = "${var.project}-frontend-${terraform.workspace}"

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
