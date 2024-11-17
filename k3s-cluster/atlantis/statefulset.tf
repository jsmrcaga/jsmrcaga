locals {
  atlantis_port = 4141
  volume_name = "atlantis-volume"
  atlantis_data_path = "/atlantis"
}

resource kubernetes_stateful_set_v1 atlantis_ss {
  wait_for_rollout = false

  metadata {
    name = "atlantis"
    namespace = local.namespace
  }

  spec {
    selector {
      match_labels = {
        app = "atlantis"
      }
    }

    update_strategy {
      type = "RollingUpdate"
      rolling_update {
        partition = 0
      }
    }

    # Let's allow 2 instances for perf
    replicas = 2

    service_name = kubernetes_service_v1.atlantis_service.metadata[0].name

    template {
      metadata {
        namespace = local.namespace
        labels = {
          app = "atlantis"
        }
      }

      spec {
        security_context {
          fs_group = 1000
        }

        container {
          name = "atlantis"
          image = "ghcr.io/runatlantis/atlantis:v0.28.3-alpine"
          args = [
            "server",
            "--port=4141",
            "--disable-apply-all",
            "--emoji-reaction=thumbsup",
            "--repo-allowlist='github.com/jsmrcaga/*'",
            "--web-basic-auth",
            "--atlantis-url=http://atlantis.jocolina.com/",
          ]

          resources {
            requests = {
              memory = "256Mi"
              cpu = "0.2"
            }

            limits = {
              memory = "512Mi"
              cpu = "0.2"
            }
          }

          volume_mount {
            name = local.volume_name
            mount_path = local.atlantis_data_path
          }

          port {
            name = "atlantis"
            container_port = local.atlantis_port
          }

          env {
            name = "ATLANTIS_GH_USER"
            value_from {
              secret_key_ref {
                name = kubernetes_secret_v1.github.metadata[0].name
                key = "username"
                optional = false
              }
            }
          }

          env {
            name = "ATLANTIS_GH_TOKEN"
            value_from {
              secret_key_ref {
                name = kubernetes_secret_v1.github.metadata[0].name
                key = "token"
                optional = false
              }
            }
          }

          env {
            name = "ATLANTIS_GH_WEBHOOK_SECRET"
            value_from {
              secret_key_ref {
                name = kubernetes_secret_v1.github.metadata[0].name
                key = "webhook_secret"
                optional = false
              }
            }
          }

          env {
            name = "ATLANTIS_API_SECRET"
            value = var.api_secret
          }

          env {
            name = "ATLANTIS_DATA_DIR"
            value = local.atlantis_data_path
          }

          env {
            name = "ATLANTIS_WEB_USERNAME"
            value = var.web_username
          }

          env {
            name = "ATLANTIS_WEB_PASSWORD"
            value = var.web_password
          }
        }
      }
    }

    volume_claim_template {
      metadata {
        name = local.volume_name
        namespace = local.namespace
        labels = {
          app = "atlantis"
        }
      }

      spec {
        access_modes = ["ReadWriteOnce"]
        resources {

          # https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
          requests = {
            storage = "2Gi"
          }
        }
      }
    }
  }
}
