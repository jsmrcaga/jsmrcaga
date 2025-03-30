resource kubernetes_service_v1 loki {
  metadata {
    name = "loki"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"

    selector = {
      app = "loki"
    }

    port {
      name = "ingest"
      target_port = "ingest"
      port = 8912
    }
  }
}
