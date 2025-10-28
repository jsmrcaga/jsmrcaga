resource kubernetes_config_map_v1 config {
  metadata {
    name = "glance-config"
    namespace = local.namespace
  }

  data = {
      for file in fileset("${path.module}/config", "*.yml"):
      file => file("${path.module}/config/${file}")
  }
}

resource kubernetes_config_map_v1 assets {
  metadata {
    name = "glance-assets"
    namespace = local.namespace
  }

  binary_data = {
      for file in fileset("${path.module}/assets", "*"):
      file => filebase64("${path.module}/assets/${file}")
  }
}

resource kubernetes_secret_v1 secrets {
  metadata {
    name = "glance-secrets"
    namespace = local.namespace
  }

  data = {
    secret_key = var.secret_key
  }
}
