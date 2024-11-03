resource kubernetes_stateful_set_v1 prometheus {
  timeouts {
    create = "30s"
    delete = "30s"
    update = "30s"
    read = "5s"
  }

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
        container {
          name = "prometheus"
          image = "prom/prometheus:v2.45.6"
          args = [
            # Copied from
            # https://hub.docker.com/layers/prom/prometheus/v2.45.6/images/sha256-ec6ac6b5c46438a2a705e0a12e4404a381c9cc47d1f4f24c209d737b35266768?context=explore
            "--config.file=${local.prom_config_file}",
            "--storage.tsdb.path=/prometheus",
            "--web.console.libraries=/usr/share/prometheus/console_libraries",
            "--web.console.templates=/usr/share/prometheus/consoles",
            "--web.config.file=${local.prom_web_config_file}",
            "--web.enable-lifecycle",
          ]

          port {
            container_port = 9090
          }

          volume_mount {
            name = "prom-data"
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
      }
    }

    # For storage
    volume_claim_template {
      metadata {
        name = "prom-data"
      }

      spec {
        access_modes = ["ReadWriteOnce"]

        resources {
          limits = {
            storage = "2Gi"
          }

          requests = {
            storage = "1Gi"
          }
        }
      }
    }
  }
}
