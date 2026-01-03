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
        container {
          name = "grafana"
          image = "grafana/grafana:12.3.1"

          args = [
            "--config=/grafana/config/grafana.ini"
          ]

          port {
            container_port = 3000
          }

          volume_mount {
            name = "grafana-data-longhorn"
            # from grafana.ini
            mount_path = "/var/lib/grafana"
          }

          volume_mount {
            name = "grafana-config"
            # from grafana.ini
            mount_path = "/grafana/config"
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
          name = "grafana-data-longhorn"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.data.metadata[0].name
          }
        }
      }
    }
  }
}
