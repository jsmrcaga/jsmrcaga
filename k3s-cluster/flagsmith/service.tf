resource kubernetes_service_v1 flagsmith {
  metadata {
    name = "flagsmith"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"
    
    selector = {
      app = local.app
    }

    port {
      name = "flagsmith"
      port = 9876
      target_port = 8000
    }
  }
}

resource kubernetes_ingress_v1 flagsmith {
  metadata {
    name = "flagsmith"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
      "traefik.ingress.kubernetes.io/router.entrypoints" = "websecure"
      "traefik.ingress.kubernetes.io/router.tls" = "true"
      "traefik.ingress.kubernetes.io/router.tls.certresolver" = "letsencrypt"
      "traefik.ingress.kubernetes.io/router.tls.domains.0.main" = "flags.jocolina.com"
    }
  }

  spec {
    rule {
      host = "flags.jocolina.com"

      http {
        path {
          path = "/"
          path_type = "Prefix"

          backend {
            service {
              name = kubernetes_service_v1.flagsmith.metadata[0].name
              port {
                number = 9876
              }
            }
          }
        }
      }
    }
  }
}
