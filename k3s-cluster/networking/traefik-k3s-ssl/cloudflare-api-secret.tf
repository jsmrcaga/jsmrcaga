resource kubernetes_secret_v1 cloudflare_api_token {
  metadata {
    name = "cloudflare-api-token"
    namespace = "kube-system"
  }

  data = {
    token = var.cloudflare_api_token
  }
}
