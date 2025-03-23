resource kubernetes_stateful_set_v1 grafana {
  wait_for_rollout = false

  metadata {
    name = "grafana"
    namespace = local.namespace

    labels = {
      app = "grafana"
    }
  }

  spec {
    service_name = kubernetes_service_v1.grafana_service.metadata[0].name
    replicas = 1

    selector {
      match_labels = {
        app = "grafana"
      }
    }

    template {
      metadata {
        name = "grafana"
        namespace = local.namespace

        labels = {
          app = "grafana"
        }
      }

      spec {
        init_container {
          name = "permissions-fixer"
          image = "alpine:3.19"

          security_context {
            run_as_user = "0"
          }

          volume_mount {
            name = "grafana-data-migration"
            # from grafana.ini
            mount_path = "/grafana-migration"
          }

          command = [
            "sh",
            "-c",
            "chown -R 472:0 /grafana-migration"
          ]
        }

        container {
          name = "grafana"
          image = "grafana/grafana:10.2.8"

          args = [
            "--config=/grafana/config/grafana.ini"
          ]

          port {
            container_port = 3000
          }

          volume_mount {
            name = "grafana-data"
            # from grafana.ini
            mount_path = "/var/lib/grafana"
          }

          volume_mount {
            name = "grafana-config"
            # from grafana.ini
            mount_path = "/grafana/config"
          }

          volume_mount {
            name = "grafana-data-migration"
            # from grafana.ini
            mount_path = "/grafana-migration"
          }
        }

        volume {
          name = "grafana-config"

          config_map {
            name = kubernetes_config_map_v1.grafana_config.metadata[0].name
            optional = false

            items {
              key = "content"
              path = "./grafana.ini"
            }
          }
        }

        volume {
          name = "grafana-data-migration"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.data.metadata[0].name
          }
        }
      }
    }

    volume_claim_template {
      metadata {
        name = "grafana-data"
      }

      spec {
        access_modes = ["ReadWriteOnce"]

        resources {
          limits = {
            storage = "2Gi"
          }

          requests = {
            storage = "2Gi"
          }
        }
      }
    }
  }
}
