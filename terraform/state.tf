# State
// This file is used to create your terraform infrastructure bucket.
// This is where all the configuration files for you infrastructure will be saved.

// TODO: Update 'your-project-name'
terraform {
  backend "s3" {
    bucket  = "your-project-name-terraform"
    key     = "terraform.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}
