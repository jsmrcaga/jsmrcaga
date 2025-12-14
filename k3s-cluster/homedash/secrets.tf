resource kubernetes_secret_v1 ghcr {
  metadata {
    name = "ghcr"
    namespace = local.namespace
  }

  type = "kubernetes.io/dockerconfigjson"
  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        "ghcr.io" = {
          auth = base64encode("${var.github.username}:${var.github.token}")
        }
      }
    })
  }
}
