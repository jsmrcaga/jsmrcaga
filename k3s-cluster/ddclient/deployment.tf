resource kubernetes_deployment_v1 ddclient {
  wait_for_rollout = false

  metadata {
    name = local.name
    namespace = local.namespace
  }

  spec {
    replicas = 1
    revision_history_limit = 3

    strategy {
      type = "RollingUpdate"

      rolling_update {
        max_surge = 1
        max_unavailable = 0
      }
    }

    selector {
      match_labels = {
        app = local.name
      }
    }

    template {
      metadata {
        name = local.name
        namespace = local.namespace
        labels = {
          app = local.name
        }
      }

      spec {
        volume {
          name = "ddclient-conf"
          config_map {
            name = kubernetes_config_map_v1.ddclient_config.metadata[0].name
            optional = false
            items {
              key = "config"
              path = "./ddclient.conf"
            }
          }
        }

        container {
          name = local.name
          image = "jsmrcaga/ddclient:v0.0.1"

          command = ["ddclient", "-daemon", "300"]

          resources {
            limits = {
              cpu = "50m"
              memory = "50Mi"
            }

            requests = {
              cpu = "50m"
              memory = "50Mi"
            }
          }

          startup_probe {
            success_threshold = 1
            failure_threshold = 3

            initial_delay_seconds = 2
            period_seconds = 1

            exec {
              command = ["pidof", "ddclient"]
            }
          }

          volume_mount {
            name = "ddclient-conf"
            # the filename will come from the volume itself
            mount_path = "/etc/ddclient"
          }
        }
      }
    }
  }
}
