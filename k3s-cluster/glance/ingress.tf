resource kubernetes_ingress_v1 ingress {
  wait_for_load_balancer = false

  metadata {
    name = "glance"
    namespace = local.namespace

    annotations = {
      "traefik.ingress.kubernetes.io/router.entrypoints" = "websecure"
      "traefik.ingress.kubernetes.io/router.tls" = "true"
      "traefik.ingress.kubernetes.io/router.tls.certresolver" = "letsencrypt"
      "traefik.ingress.kubernetes.io/router.tls.domains.0.main" = "dash.jocolina.com"
    }
  }

  spec {
    ingress_class_name = "traefik"

    rule {
      host = "dash.jocolina.com"

      http {
        path {
          path = "/"
          path_type = "Prefix"

          backend {
            service {
              name = kubernetes_service_v1.service.metadata[0].name
              port {
                name = "glance-web"
              }
            }
          }
        }
      }
    }
  }
}
