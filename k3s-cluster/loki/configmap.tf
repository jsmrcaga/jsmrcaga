resource kubernetes_config_map_v1 config {
  metadata {
    name = "loki-config"
    namespace = local.namespace
  }

  data = {
    config = file("${path.module}/config/loki.yml")
  }
}
