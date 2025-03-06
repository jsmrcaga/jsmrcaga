resource kubernetes_persistent_volume_claim_v1 volume_claim {
  wait_until_bound = false

  metadata {
    name = "wireguard-config-claim"
    namespace = local.namespace
  }

  spec {
    storage_class_name = "longhorn"

    access_modes = ["ReadWriteMany"]
    volume_mode = "Filesystem"

    resources {
      requests = {
        storage = "10Mi"
      }

      limits = {
        storage = "15Mi"
      }
    }
  }
}
