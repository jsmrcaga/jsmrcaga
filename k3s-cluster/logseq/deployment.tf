resource kubernetes_deployment_v1 logseq {
  wait_for_rollout = false

  metadata {
    name = "logseq"
    namespace = local.namespace
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "logseq"
      }
    }

    template {
      metadata {
        name = "logseq"
        namespace = local.namespace

        labels = {
          app = "logseq"
        }
      }

      spec {
        container {
          name = "logseq"
          image = "ghcr.io/logseq/logseq-webapp:latest"

          resources {
            requests = {
              cpu = "200m"
              memory = "125Mi"
            }

            limits = {
              cpu = "500m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }
}
