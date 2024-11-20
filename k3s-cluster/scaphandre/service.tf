resource kubernetes_service_v1 scaphandre {
  wait_for_load_balancer = false

  metadata {
    name = local.name
    namespace = local.namespace
  }

  spec {
    # no need to have this broader
    type = "NodePort"

    selector = {
      app = local.name
    }

    port {
      name = "metrics-port"
      protocol = "TCP"
      // same on service & pod container
      target_port = "metrics-pod"
      port = local.prometheus_exporter_port
      node_port = local.prometheus_exporter_port_node
    }
  }
}
