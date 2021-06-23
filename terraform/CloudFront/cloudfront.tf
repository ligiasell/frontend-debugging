# Cloudfront
// Define the used resources
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {

}

// This will configure your cloudfront distribution
// It allows cloudfront to send get requests to the s3 bucket
// where your application is stored and specifies that every request will
// be redirected to HTTPS
resource "aws_cloudfront_distribution" "www_distribution" {
  origin {
    domain_name = var.bucket.bucket_regional_domain_name
    origin_id   = var.bucket.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  // Remove this if you don't have a domain
  aliases = var.aliases

  // This will define the cache behaviors and allowed types of
  // request of your cloudfront distribution.

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = var.bucket.bucket_regional_domain_name
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  // acm_certificate_arn contains your certificate saved in variables.tf
  // Add cloudfront_default_certificate = true when you don't
  // have a certificate and remove minimum_procotocol_version and
  // ssl_support_method.
  // minimum_protocol_version is related to encryption done by HTTPS: The
  // most recent version is usually the safest one, but at the same time
  // this will limit the number of devices that can work with it
  // (older browser might be affected)
  viewer_certificate {
    acm_certificate_arn      = var.certificate_arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method       = "sni-only"
  }

}

# Update bucket policy
// Set policies to only allow get from S3.
// Creates the json in S3.
// Cloudfront creates the policy and saves it in the S3 bucket.
data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${var.bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "origin_bucket" {
  bucket = var.bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}
