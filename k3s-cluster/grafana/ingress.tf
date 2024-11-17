resource kubernetes_ingress_v1 grafana_ingress {
  metadata {
    name = "grafana"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
      "traefik.ingress.kubernetes.io/router.entrypoints" = "web"
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


resource kubernetes_ingress_v1 grafana_ingress_tls {
  metadata {
    name = "grafana-tls"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
      "traefik.ingress.kubernetes.io/router.entrypoints" = "websecure"
      "traefik.ingress.kubernetes.io/router.tls" = "true"
      "traefik.ingress.kubernetes.io/router.tls.certresolver" = "letsencrypt"
      "traefik.ingress.kubernetes.io/router.tls.domains.0.main" = "grafana.jocolina.com"
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
