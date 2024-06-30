terraform {
  required_providers {
    kubernetes = {
      source = "hashicorp/kubernetes"
      version = "~> 2.27.0"
    }
  }
}

provider kubernetes {
  config_path = "~/.k3s/k3s-remote.yml"
}
