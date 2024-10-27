resource kubernetes_service_v1 plex {
  wait_for_load_balancer = false

  metadata {
    name = local.name
    namespace = local.namespace
  }

  spec {
    type = "LoadBalancer"
    external_traffic_policy = "Cluster"

    selector = {
      app = local.name
    }

    dynamic "port" {
      for_each = local.plex_ports

      content {
        name = "${port.value["port"]}"
        port = port.value["port"]
        target_port = port.value["port"]
        protocol = port.value["protocol"]
      }
    }
  }
}
