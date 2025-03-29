resource kubernetes_ingress_v1 ingress {
  wait_for_load_balancer = false

  metadata {
    name = "logseq"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
      "traefik.ingress.kubernetes.io/router.entrypoints" = "websecure"
      "traefik.ingress.kubernetes.io/router.tls" = "true"
      "traefik.ingress.kubernetes.io/router.tls.certresolver" = "letsencrypt"
      "traefik.ingress.kubernetes.io/router.tls.domains.0.main" = "logseq.jocolina.com"
    }
  }

  spec {
    ingress_class_name = "traefik"

    rule {
      host = "logseq.jocolina.com"

      http {
        path {
          path = "/"
          path_type = "Prefix"

          backend {
            service {
              name = kubernetes_service_v1.service.metadata[0].name
              port {
                name = "web"
              }
            }
          }
        }
      }
    }
  }
}
