resource kubernetes_service_v1 service {
  metadata {
    name = "plasma"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"

    selector = {
      match_labels = {
        app = "plasma"
      }
    }

    dynamic port {
      for_each = local.networking_tcp
      content {
        port = port.value
        protocol = "TCP"
      }
    }

    dynamic port {
      for_each = local.networking_udp
      content {
        port = port.value
        protocol = "UDP"
      }
    }
  }
}
