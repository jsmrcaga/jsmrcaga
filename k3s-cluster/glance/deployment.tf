resource kubernetes_deployment_v1 glance {
  wait_for_rollout = false

  metadata {
    name = "glance"
    namespace = local.namespace
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "glance"
      }
    }

    template {
      metadata {
        labels = {
          app = "glance"
        }
      }

      spec {

        volume {
          name = "glance-config-files"
          config_map {
            # From the docs:
            # If unspecified, each key-value pair in the Data field
            # of the referenced ConfigMap will be projected into the
            # volume as a file whose name is the key and content is the value
            name = kubernetes_config_map_v1.config.metadata[0].name
          }
        }

        volume {
          name = "glance-asset-files"

          config_map {
            name = kubernetes_config_map_v1.assets.metadata[0].name
          }
        }

        container {
          name = "glance"
          image = "glanceapp/glance:v0.8.4"

          # port {
          #   name = "glance-web"
          #   container_port = 8080
          # }

          resources {
            limits = {
              memory = "100Mi"
              cpu = "150m"
            }

            requests = {
              memory = "50Mi"
              cpu = "100m"
            }
          }

          env {
            name = "GLANCE_PORT"
            value = local.glance.port
          }

          env {
            name = "GLANCE_SECRET_KEY"
            value_from {
              secret_key_ref {
                key = "secret_key"
                name = kubernetes_secret_v1.secrets.metadata[0].name
                optional = false
              }
            }
          }

          volume_mount {
            name = "glance-config-files"
            mount_path = "/app/config"

            # Container should not edit the config on its own
            read_only = true
          }

          volume_mount {
            name = "glance-asset-files"
            mount_path = "/app/assets"

            # Container should not edit the config on its own
            read_only = true
          }
        }
      }
    }
  }
}
