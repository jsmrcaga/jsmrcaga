resource kubernetes_stateful_set_v1 loki {
  wait_for_rollout = false

  metadata {
    name = "loki"
    namespace = local.namespace
  }

  spec {
    service_name = kubernetes_service_v1.loki.metadata[0].name
    replicas = 1

    selector {
      match_labels = {
        app = "loki"
      }
    }

    template {
      metadata {
        name = "loki"
        namespace = local.namespace

        labels = {
          app = "loki"
        }
      }

      spec {
        volume {
          name = "loki-storage"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.volume.metadata[0].name
          }
        }

        volume {
          name = "loki-config"
          config_map {
            optional = false
            name = kubernetes_config_map_v1.config.metadata[0].name
            items {
              key = "config"
              path = "loki.yml"
              # read only owner & group
              mode = "0444"
            }
          }
        }

        init_container {
          name = "storage-permissions"
          image = "alpine:3.19"

          security_context {
            run_as_user = 0
          }

          volume_mount {
            name = "loki-storage"
            mount_path = "/loki/storage"
          }

          command = [
            "sh",
            "-c",
            # 'loki' user is id 10001 and group 10001
            "chown -R 10001:10001 /loki"
          ]
        }

        container {
          name = "loki"
          image = "grafana/loki:3.4.2"
          args = [
            "--config.file=/loki/config/loki.yml"
          ]

          volume_mount {
            name = "loki-config"
            mount_path = "/loki/config"
          }

          volume_mount {
            name = "loki-storage"
            mount_path = "/loki/storage"
          }

          port {
            name = "ingest"
            container_port = 3100
          }
        }
      }
    }
  }
}
