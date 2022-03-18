terraform {
  experiments = [module_variable_optional_attrs]

	required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 3.10.1"
    }
  }
}
