resource kubernetes_persistent_volume_v1 media_volume {
  metadata {
    name = "plex-media-volume"
  }

  spec {
    node_affinity {
      required {
        node_selector_term {
          match_expressions {
            key = "ethernet-only"
            operator = "In"
            values = ["true"]
          }
        }
      }
    }

    storage_class_name = local.main_storage_class_name

    access_modes = ["ReadWriteOnce"]
    // We made a 250GB partition, making it 246 in reality
    capacity = {
      storage = "246Gi"
    }

    persistent_volume_source {
      # local because we're mounting a whole disk
      local {
        path = "/media/plex"
      }
    }
  }
}
