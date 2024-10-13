resource kubernetes_service_v1 elastic {
  metadata {
    name = "elastic"
    namespace = local.namespace
  }

  spec {
    type = "LoadBalancer"

    selector = {
      app = "elastic"
    }

    port {
      name = "main"
      port = 9292
      target_port = 9200
    }
  }
}
