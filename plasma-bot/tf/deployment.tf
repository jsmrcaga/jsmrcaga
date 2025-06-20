resource kubernetes_deployment_v1 plasma_bot {
  wait_for_rollout = false

  metadata {
    name = "plasma-bot"
    namespace = local.namespace
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "plasma-bot"
      }
    }

    template {
      metadata {
        name = "plasma-bot"
        labels = {
          app = "plasma-bot"
        }
      }

      spec {
        container {
          name = "plasma-bot"
          image = "jsmrcaga/plasma-bot:v0.0.3"

          resources {
            requests = {
              cpu = "100m"
              memory = "100Mi"
            }

            limits = {
              cpu = "200m"
              memory = "256Mi"
            }
          }

          dynamic "env" {
            for_each = var.env
            iterator = each

            content {
              name = each.key
              value = each.value
            }
          }
        }
      }
    }
  }
}
