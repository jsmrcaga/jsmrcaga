resource kubernetes_persistent_volume_claim_v1 data {
  wait_until_bound = false

  metadata {
    name = "prom-data"
    namespace = local.namespace
  }

  spec {
    access_modes = ["ReadWriteOnce"]
    storage_class_name = "longhorn"

    resources {
      requests = {
        storage = "50Gi"
      }

      limits = {
        storage = "50Gi"
      }
    }
  }
}
