resource random_password random_django_key {
  length = 20
  special = true
}

resource kubernetes_deployment_v1 flagsmith {
  wait_for_rollout = false

  metadata {
    name = "flagsmith"
    namespace = local.namespace
  }

  spec {
    selector {
      match_labels = {
        app = local.app
      }
    }

    # 1 replica for migrations
    replicas = 1

    template {
      metadata {
        name = "flagsmith"
        namespace = local.namespace
        labels = {
          app = local.app
        }
      }

      spec {
        container {
          name = "flagsmith"
          image = coalesce(var.flagsmith_image, "flagsmith/flagsmith:2.160.2")

          env {
            name = "DATABASE_URL"
            # TODO: put this on a secret
            value = "postgres://flagsmith:${urlencode(random_password.postgres_pass.result)}@postgres.flagsmith.svc.cluster.local:5432/flagsmith_db"
          }

          env {
            name = "ENVIRONMENT"
            value = var.environment
          }

          env {
            name = "DJANGO_SECRET_KEY"
            value = random_password.random_django_key.result
          }

          env {
            name = "ADMIN_EMAIL"
            value = var.admin_email
          }

          env {
            name = "ORGANIZATION_NAME"
            value = var.org_name
          }

          env {
            name = "PROJECT_NAME"
            value = var.project_name
          }

          env {
            name = "ALLOW_REGISTRATION_WITHOUT_INVITE"
            value = "False"
          }

          env {
            name = "DJANGO_ALLOWED_HOSTS"
            value = "flags.jocolina.com"
          }

          resources {
            requests = {
              cpu = "0.1"
              memory = "500Mi"
            }

            limits = {
              cpu = "0.2"
              memory = "500Mi"
            }
          }
        }
      }
    }
  }
}
