# Provider definition
// This is the entry point to terraform application.
// Here we define what's the provider of our infrastructure.
// Usually we work with aws, as configured bellow.
provider "aws" {
  region  = "us-east-2"
  version = "~> 2.69"
}

# S3 configuration
// The source points to the S3 configuration folder.
// The project is the name of the project defined in locals.tf
// normally staging or production.
module "s3" {
  source  = "./S3"
  project = local.workspace.project
}

# Cloudfront
// The source points to the cloudfront configuration folder.
// The buckets contains the output from the S3 module above,
// it's the bucket that you will store your files.
// The certificate_arn is the SSL certificate that you need
// to create and validate before applying terraform. This value
// is defined in the locals.tf together with the alias based on the
// desired workspace.
// The domain must be pointing to the cloudfront url.
// Remove certificate_arn and aliases if you don't have a domain.
module "cloudfront" {
  source          = "./CloudFront"
  bucket          = module.s3.bucket
  certificate_arn = local.workspace.certificate_arn
  aliases         = local.workspace.aliases
}
