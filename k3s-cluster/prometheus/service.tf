# For StateFul Sets we need headless services
# https://kubernetes.io/docs/concepts/services-networking/service/#headless-services
resource kubernetes_service_v1 prometheus_service {
  metadata {
    name = "prometheus"
    namespace = local.namespace
  }

  spec {
    type = "LoadBalancer"

    selector = {
      app = "prometheus"
    }

    port {
      name = "main"
      port = 9090 // the port of the service _within the cluster_
      target_port = 9090 // default prometheus port
    }
  }
}

resource kubernetes_ingress_v1 prometheus_ingress {
  metadata {
    name = "prometheus"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
    }
  }

  spec {
    rule {
      host = "prometheus.jocolina.com"

      http {
        path {
          path = "/"
          path_type = "Prefix"

          backend {
            service {
              name = local.service_name
              port {
                number = 9090
              }
            }
          }
        }
      }
    }
  }
}
