resource kubernetes_service_v1 homedash {
  metadata {
    name = "homedash"
    namespace = local.namespace
  }

  spec {
    type = "LoadBalancer"

    selector = {
      app = "homedash"
    }

    port {
      port = 3000
      target_port = 3000
      name = "web-port"
    }
  }
}
