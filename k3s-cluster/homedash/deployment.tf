resource kubernetes_deployment_v1 homedash {
  wait_for_rollout = false

  metadata {
    name = "homedash"
    namespace = local.namespace
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "homedash"
      }
    }

    template {
      metadata {
        namespace = local.namespace
        labels = {
          app = "homedash"
        }
      }

      spec {
        host_network = true

        image_pull_secrets {
          name = kubernetes_secret_v1.ghcr.metadata[0].name
        }

        container {
          name = "app"
          image = "ghcr.io/jsmrcaga/homedash:v0.0.0"

          env {
            name = "NODE_TLS_REJECT_UNAUTHORIZED"
            value = "0"
          }

          env {
            name = "UNIFI_LOCAL_ENDPOINT"
            value = var.secrets.UNIFI_LOCAL_ENDPOINT
          }

          env {
            name = "UNIFI_LOCAL_API_KEY"
            value = var.secrets.UNIFI_LOCAL_API_KEY
          }

          port {
            container_port = 3000
            name = "web-port"
          }

          resources {
            limits = {
              cpu = "100m"
              memory = "100Mi"
            }

            requests = {
              cpu = "50m"
              memory = "50Mi"
            }
          }
        }
      }
    }
  }
}
