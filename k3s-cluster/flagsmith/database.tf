resource random_password postgres_pass {
  length = 20
  special = true
}

resource kubernetes_stateful_set_v1 postgres {
  wait_for_rollout = false

  metadata {
    name = "postgres"
    namespace = local.namespace
  }

  spec {
    selector {
      match_labels = {
        app = "postgres"
      }
    }

    replicas = 1
    service_name = kubernetes_service_v1.postgres.metadata[0].name

    volume_claim_template {
      metadata {
        name = "postgres"
        namespace = local.namespace
        labels = {
          app = "postgres"
        }
      }

      spec {
        access_modes = ["ReadWriteOnce"]
        resources {
          requests = {
            storage = "2Gi"
          }
        }
      }
    }

    template {
      metadata {
        namespace = local.namespace
        labels = {
          app = "postgres"
        }
      }

      spec {
        container {
          name = "postgres"
          # copied from https://raw.githubusercontent.com/Flagsmith/flagsmith/main/docker-compose.yml
          image = coalesce(var.postgres_version, "postgres:15-alpine")

          env {
            name = "POSTGRES_PASSWORD"
            value = random_password.postgres_pass.result
          }

          env {
            name = "POSTGRES_USER"
            value = "flagsmith"
          }

          env {
            name = "POSTGRES_DB"
            value = "flagsmith_db"
          }

          resources {
            requests = {
              memory = "1000Mi"
              cpu = "0.2"
            }

            limits = {
              memory = "1500Mi"
              cpu = "0.5"
            }
          }

          volume_mount {
            name = "postgres"
            mount_path = "/var/lib/postgresql/data"
          }

          port {
            name = "postgres"
            container_port = 5432
          }
        }
      }
    }
  }
}

resource kubernetes_service_v1 postgres {
  metadata {
    name = "postgres"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"

    selector = {
      # this is important, otherwise the service
      # ends up targeting the flagsmith docs
      app = "postgres"
    }

    port {
      name = "postgres"
      port = 5432
      target_port = 5432
    }
  }
}
