terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.11.5"
    }

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

provider "vercel" {
  api_token = var.vercel.token
}
