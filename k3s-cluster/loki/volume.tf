resource kubernetes_persistent_volume_claim_v1 volume {
  metadata {
    name = "loki-storage"
    namespace = local.namespace
  }

  spec {
    storage_class_name = "longhorn"

    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "5Gi"
      }

      limits = {
        storage = "7Gi"
      }
    }
  }
}
