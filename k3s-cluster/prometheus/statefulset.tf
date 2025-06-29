resource kubernetes_stateful_set_v1 prometheus {
  wait_for_rollout = false

  metadata {
    name = "prometheus"
    namespace = local.namespace

    labels = {
      app = "prometheus"
    }
  }

  spec {
    service_name = local.service_name

    replicas = 1

    selector {
      match_labels = {
        app = "prometheus"
      }
    }

    template {
      metadata {
        name = "prometheus"
        namespace = local.namespace

        labels = {
          app = "prometheus"
        }
      }

      spec {
        service_account_name = kubernetes_service_account_v1.prom_sa.metadata[0].name

        container {
          name = "prometheus"
          image = "prom/prometheus:v3.0.1"
          args = [
            # Copied from
            # https://hub.docker.com/layers/prom/prometheus/v2.45.6/images/sha256-ec6ac6b5c46438a2a705e0a12e4404a381c9cc47d1f4f24c209d737b35266768?context=explore
            "--config.file=${local.prom_config_file}",
            "--storage.tsdb.path=/prometheus",
            "--web.console.libraries=/usr/share/prometheus/console_libraries",
            "--web.console.templates=/usr/share/prometheus/consoles",
            "--web.config.file=${local.prom_web_config_file}",
            "--web.enable-lifecycle",
            "--web.enable-remote-write-receiver",
            "--storage.tsdb.retention.time=2y"
          ]

          resources {
            limits = {
              cpu = "2000m"
              memory = "6Gi"
            }

            requests = {
              cpu = "1000m"
              memory = "4Gi"
            }
          }

          port {
            container_port = 9090
          }

          volume_mount {
            name = "prom-longhorn"
            # --storage.tsdb.path
            mount_path = "/prometheus"
          }

          volume_mount {
            name = "prom-config"
            mount_path = "${local.prom_config_dir}/global"
          }

          volume_mount {
            name = "prom-web-config"
            mount_path = "${local.prom_config_dir}/web"
          }

          volume_mount {
            name = "prom-recording-rules"
            mount_path = "${local.prom_config_dir}/rules"
          }
        }

        # For config
        volume {
          name = "prom-config"

          config_map {
            name = kubernetes_config_map_v1.prom_config.metadata[0].name
            optional = false

            items {
              key = "content"
              path = "./prometheus.yml"
            }
          }
        }

        volume {
          name = "prom-web-config"

          config_map {
            name = kubernetes_config_map_v1.prom_web_config.metadata[0].name
            optional = false

            items {
              key = "content"
              path = "./prometheus-web.yml"
            }
          }
        }

        volume {
          name = "prom-longhorn"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.data.metadata[0].name
          }
        }

        volume {
          name = "prom-recording-rules"
          config_map {
            name = kubernetes_config_map_v1.prom_recording_rules.metadata[0].name
            optional = true
            #  not specifying items makes it project every item as a file
          }
        }
      }
    }
  }
}
