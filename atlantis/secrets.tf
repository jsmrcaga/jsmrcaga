resource kubernetes_secret_v1 github {
  metadata {
    name = "atlantis-github"
    namespace = local.namespace
  }

  data = {
    "username" = "fake"
    "token" = "fake" 
    "webhook_secret" = "fake"
  }
}
