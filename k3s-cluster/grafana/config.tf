resource kubernetes_config_map_v1 grafana_config {
  metadata {
    namespace = local.namespace
    name = "grafana-config"
  }

  data = {
    "content" = file("${path.module}/grafana.ini")
  }
}
