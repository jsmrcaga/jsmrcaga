terraform {
  required_version = ">= 1.3.0"

	required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 3.10.1"
    }
  }
}
