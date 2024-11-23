resource kubernetes_cron_job_v1 ddclient {
  metadata {
    name = local.name
    namespace = local.namespace
  }

  spec {
    schedule = "*/5 * * * *"
    concurrency_policy = "Forbid"

    job_template {
      metadata {
        name = local.name
        namespace = local.name
      }

      spec {
        completions = 1
        parallelism = 1

        template {
          metadata {
            name = local.name
            labels = {
              app = local.name
            }
          }

          spec {
            volume {
              name = "ddclient-conf"
              config_map {
                name = kubernetes_config_map_v1.ddclient_config.metadata[0].name
                optional = false
                items {
                  key = "config"
                  path = "./ddclient.conf"
                }
              }
            }

            container {
              name = local.name
              image = "jsmrcaga/ddclient:v0.0.1"

              resources {
                limits = {
                  cpu = "50m"
                  memory = "50Mi"
                }

                requests = {
                  cpu = "50m"
                  memory = "50Mi"
                }
              }

              startup_probe {
                success_threshold = 1
                failure_threshold = 3

                initial_delay_seconds = 2
                period_seconds = 1

                exec {
                  command = ["pidof", "ddclient"]
                }
              }

              volume_mount {
                name = "ddclient-conf"
                # the filename will come from the volume itself
                mount_path = "/etc/ddclient"
              }
            }
          }
        }
      }
    }
  }
}
