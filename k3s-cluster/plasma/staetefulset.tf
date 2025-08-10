resource kubernetes_stateful_set_v1 plasma {
  metadata {
    name = "plasma"
    namespace = local.namespace
  }

  spec {
    replicas = 1
    
    selector {
      match_labels = {
        app = "plasma"
      }
    }

    template {
      metadata {
        name = "plasma"
        namespace = local.namespace
        labels = {
          app = "plasma"
        }
      }

      spec {
        node_selector {
          match_labels = {
            gpu_enabled = "true"
          }
        }

        containers {
          image = var.plasma.image

          resources {
            limits = {
              cpu = "3500m"
              memory = "15Gi"
            }

            requests = {
              cpu = "3000m"
              memory = "12Gi"
            }
          }
        }
      }
    }
  }
}
