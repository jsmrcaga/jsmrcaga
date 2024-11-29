resource kubernetes_service_v1 alloy {
  metadata {
    namespace = local.namespace
    name = "alloy"
  }

  spec {
    type = "LoadBalancer"

    selector = {
      app = "alloy"
    }

    port {
      name = "alloy-default-port"
      port = local.otel_collector_port
      target_port = local.otel_collector_port
    }

    port {
      name = "web-ui"
      port = 12345
      target_port = 12345
    }
  }
}
