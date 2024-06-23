resource kubernetes_deployment_v1 grafana {
  lifecycle {
    ignore_changes = [
      spec[0].template[0].spec[0].container[0].image
    ]
  }

  metadata {
    name = "grafana"
    namespace = kubernetes_namespace_v1.grafana.metadata[0].name

    labels = {
      app = "grafana"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "grafana"
      }
    }

    strategy {
      type = "RollingUpdate"
      rolling_update {
        max_surge = 1
        max_unavailable = 0
      }
    }

    template {
      metadata {
        name = "grafana"
        namespace = kubernetes_namespace_v1.grafana.metadata[0].name

        labels = {
          app = "grafana"
        }
      }

      spec {
        container {
          name = "grafana"
          image = "grafana/grafana:main"

          port {
            container_port = 3000
          }
        }
      }
    }
  }
}
