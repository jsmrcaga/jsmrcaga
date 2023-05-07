terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 3.10.1"
    }
  }
}

provider "cloudflare" {
  api_key = var.cloudflare.api_key
  email = var.cloudflare.email
  account_id = var.cloudflare.account_id
}
