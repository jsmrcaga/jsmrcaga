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
      port = 4138
      target_port = 4138
    }

    port {
      name = "web-ui"
      port = 12345
      target_port = 12345
    }
  }
}
