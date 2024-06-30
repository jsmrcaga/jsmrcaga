resource kubernetes_service_v1 atlantis_service {
  metadata {
    name = "atlantis"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"

    selector = {
      app = "atlantis"
    }

    port {
      name = "atlantis"
      port = local.atlantis_port
      target_port = local.atlantis_port
    }
  }
}

resource kubernetes_ingress_v1 atlantis_ingress {
  metadata {
    name = "atlantis"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
    }
  }

  spec {
    rule {
      host = "atlantis.jocolina.com"

      http {
        path {
          path = "/"
          path_type = "Prefix"

          backend {
            service {
              name = local.service_name
              port {
                number = local.atlantis_port
              }
            }
          }
        }
      }
    }
  }
}
