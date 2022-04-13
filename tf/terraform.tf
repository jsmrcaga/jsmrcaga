terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 3.10.1"
    }

    github = {
      source = "integrations/github"
    }
  }
}

provider "cloudflare" {
  api_key = var.cloudflare.api_key
  email = var.cloudflare.email
  account_id = var.cloudflare.account_id
}

provider "github" {
  token = var.github.token
}

provider "aws" {
  region = "eu-west-3"
  shared_credentials_file = "./aws.cred"
}
