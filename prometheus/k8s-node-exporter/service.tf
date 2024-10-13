resource kubernetes_service_v1 service {
	metadata {
    name = "prom-node-exporter"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"
    selector = {
      app = "prom-node-exporter"
    }

    port {
      port = 9100
      target_port = 9100
      name = "prom-node-exporter"
    }
  }
}
