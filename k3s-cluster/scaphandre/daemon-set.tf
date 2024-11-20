resource kubernetes_daemon_set_v1 scaphandre {
  metadata {
    name = local.name
    namespace = local.namespace
  }

  spec {
    selector {
      match_labels = {
        app = local.name
      }
    }

    template {
      metadata {
        name = local.name
        labels = {
          app = local.name
        }
      }

      spec {
        volume {
          name = "powercap"
          host_path {
            path = "/sys/class/powercap"
            type = "Directory"
          }
        }

        volume {
          name = "proc"
          host_path {
            path = "/proc"
            type = "Directory"
          }
        }

        container {
          name = "scaphandre"
          image = "hubblo/scaphandre:1.0.0"

          command = ["scaphandre", "prometheus", "-p", local.prometheus_exporter_port]

          port {
            name = "metrics-pod"
            container_port = local.prometheus_exporter_port
          }

          liveness_probe {
            success_threshold = 1
            failure_threshold = 1

            initial_delay_seconds = 0
            period_seconds = 1
            timeout_seconds = 1

            exec {
              command = ["pidof", "scaphandre"]
            }
          }

          startup_probe {
            # forces by k8s to 1
            success_threshold = 1
            failure_threshold = 5

            initial_delay_seconds = 5
            period_seconds = 2
            timeout_seconds = 10

            exec {
              command = ["pidof", "scaphandre"]
            }
          }

          resources {
            limits = {
              cpu = "100m"
              memory = "100Mi"
            }

            requests = {
              cpu = "50m"
              memory = "50Mi"
            }
          }

          # sys/powercap
          volume_mount {
            mount_path = "/sys/class/powercap"
            name = "powercap"
          }

          # /proc
          volume_mount {
            mount_path = "/proc"
            name = "proc"
          }
        }
      }
    }
  }
}
