resource kubernetes_stateful_set_v1 plex {
  wait_for_rollout = false

  metadata {
    name = local.name
    namespace = local.namespace
  }

  spec {
    replicas = 1
    service_name = kubernetes_service_v1.plex.metadata[0].name

    selector {
      match_labels = {
        app = local.name
      }
    }

    # Media the whole disk
    dynamic "volume_claim_template" {
      for_each = local.volumes

      content {
        metadata {
          name = volume_claim_template.value.name
        }

        spec {
          volume_name = volume_claim_template.value.volume_name
          access_modes = ["ReadWriteOnce"]
          storage_class_name = local.main_storage_class_name

          # We give 200GB to the media and 35GB to transcoding, and 10 to DB
          resources {
            limits = {
              storage = volume_claim_template.value.capacity
            }

            requests = {
              storage = volume_claim_template.value.capacity
            }
          }
        }
      }
    }

    template {
      metadata {
        name = local.name
        labels = {
          app = local.name
        }
      }

      spec {
        node_selector = {
          ethernet-only = "true"
        }

        container {
          name = local.name
          image = "plexinc/pms-docker:1.41.1.9057-af5eaea7a"

          env {
            name = "TZ"
            value = "Europe/Paris"
          }

          env {
            name = "PLEX_CLAIM"
            value = var.plex_claim_token
          }

          env {
            name = "ADVERTISE_IP"
            value = "http://192.168.1.18:32400/"
          }

          dynamic "volume_mount" {
            for_each = local.volumes

            content {
              name = volume_mount.value["name"]
              mount_path = volume_mount.value["container_path"]
            }
          }

          dynamic "port" {
            for_each = local.plex_ports

            content {
              container_port = port.value["port"]
              protocol = port.value["protocol"]
            }
          }
        }
      }
    }
  }
}
