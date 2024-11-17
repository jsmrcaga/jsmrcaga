resource kubernetes_service_v1 grafana_service {
  metadata {
    name = "grafana"
    namespace = local.namespace
  }


  spec {
    type = "LoadBalancer"

    selector = {
      app = "grafana"
    }

    port {
      name = "main"
      port = 8090 // the port of the service _within the cluster_
      target_port = 3000 // default grafana port
    }
  }
}
