# Locals
// This file contains all variables used in main.tf
// TODO: Update 'react-boilerplate', 'staging-boilerplate.jungledevs.com' and
// 'boilerplate.jungledevs.com' with the project name.
// Remove certificate_arn if you don't have a domain.
locals {
  env = {
    default = {
      project = "react-boilerplate"
    }
    staging = {
      aliases         = ["staging-boilerplate.jungledevs.com"]
      certificate_arn = "arn:aws:acm:us-east-1:880104517457:certificate/dde4ea10-479e-489a-8b19-f8dde43cb6a8"
    }
    production = {
      aliases         = ["boilerplate.jungledevs.com"]
      certificate_arn = "arn:aws:acm:us-east-1:880104517457:certificate/dde4ea10-479e-489a-8b19-f8dde43cb6a8"
    }
  }
  environmentvars = "${contains(keys(local.env), terraform.workspace) ? terraform.workspace : "default"}"
  workspace       = "${merge(local.env["default"], local.env[local.environmentvars])}"
}
