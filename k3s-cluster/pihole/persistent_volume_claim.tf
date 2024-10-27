resource kubernetes_persistent_volume_claim_v1 pi_hole {
  wait_until_bound = false

  metadata {
    name = "pihole-config"
    namespace = local.namespace
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "250Mi"
      }
    }
  }
}
