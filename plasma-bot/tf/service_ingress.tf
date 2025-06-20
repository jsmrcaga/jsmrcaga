resource kubernetes_service_v1 plasma_bot {
  metadata {
    name = "plasma-bot"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"

    selector = {
      app = "plasma-bot"
    }

    port {
      name = "main"
      port = 3000
      target_port = 3000
    }
  }
}

resource kubernetes_ingress_v1 plasma_bot {
  metadata {
    name = "plasma-bot-tls"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"
      "traefik.ingress.kubernetes.io/router.entrypoints" = "websecure"
      "traefik.ingress.kubernetes.io/router.tls" = "true"
      "traefik.ingress.kubernetes.io/router.tls.certresolver" = "letsencrypt"
      "traefik.ingress.kubernetes.io/router.tls.domains.0.main" = "plasma-bot.jocolina.com"
    }
  }

  spec {
    rule {
      host = "plasma-bot.jocolina.com"
      http {
        path {
          path = "/"
          path_type = "Prefix"

          backend {
            service {
              name = kubernetes_service_v1.plasma_bot.metadata[0].name
              port {
                number = 3000
              }
            }
          }
        }
      }
    }
  }
}
