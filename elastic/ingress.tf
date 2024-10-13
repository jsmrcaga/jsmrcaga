# resource kubernetes_secret_v1 tls_secret {
#   metadata {
#     name = "elastic-tls-cert"
#     namespace = local.namespace
#   }

#   type = "kubernetes.io/tls"

#   data = {
#     "tls.crt" = ""
#     "tls.key" = ""
#   }
# }

resource kubernetes_ingress_v1 elastic {
  metadata {
    name = "elastic"
    namespace = local.namespace

    annotations = {
      "kubernetes.io/ingress.class" = "traefik"

      # "ingress.kubernetes.io/ssl-redirect" = "false"
      # "traefik.ingress.kubernetes.io/router.entrypoints" = "web, websecure"
      # "traefik.ingress.kubernetes.io/router.tls" = "true"
    }
  }

  spec {
    # tls {
    #   hosts = ["elastic.jocolina.com"]
    #   secret_name = kubernetes_secret_v1.tls_secret.metadata[0].name
    # }

    rule {
      host = "elastic.jocolina.com"

      http {
        path {
          path = "/"
          path_type = "Prefix"

          backend {
            service {
              name = kubernetes_service_v1.elastic.metadata[0].name

              port {
                number = 9292
              }
            }
          }
        }
      }
    }
  }
}
