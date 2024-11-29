resource kubernetes_config_map_v1 alloy_config {
  metadata {
    name = "alloy-config"
    namespace = local.namespace
  }

  data = {
    content = file("${path.module}/config/config.alloy")
  }
}
