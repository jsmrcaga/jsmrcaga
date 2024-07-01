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

resource kubernetes_ingress_v1 grafana_ingress {
  metadata {
    name = "grafana"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
    }
  }

  spec {
    rule {
      host = "grafana.jocolina.com"

      http {
        path {
          path = "/"
          path_type = "Prefix"

          backend {
            service {
              name = kubernetes_service_v1.grafana_service.metadata[0].name
              port {
                number = 8090
              }
            }
          }
        }
      }
    }
  }
}
