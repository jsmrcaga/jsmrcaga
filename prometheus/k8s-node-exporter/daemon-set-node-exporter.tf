// @see
// https://devopscube.com/node-exporter-kubernetes/
resource kubernetes_daemon_set_v1 prom_node_exporter {
  metadata {
    namespace = local.namespace
    name = "prometheus-node-exporter"
  }

  spec {
    selector {
      match_labels = {
        app = "prom-node-exporter"
      }
    }

    template {
      metadata {
        name = "prometheus-node-exporter"
        labels = {
          app = "prom-node-exporter"
        }
      }

      spec {
        container {
          name = "prometheus-node-exporter"
          image = "prom/node-exporter"

          args = [
            // from volumes
            "--path.sysfs=/host/sys",
            "--path.rootfs=/host/root",
            "--no-collector.wifi",
            "--no-collector.hwmon",
            "--collector.filesystem.ignored-mount-points=^/(dev|proc|sys|var/lib/docker/.+|var/lib/kubelet/pods/.+)($|/)",
            "--collector.netclass.ignored-devices=^(veth.*)$",
          ]

          port {
            container_port = 9100
          }

          resources {
            limits = {
              cpu = "250m"
              memory = "180Mi"
            }

            requests = {
              cpu = "102m"
              memory = "180Mi"
            }
          }

          volume_mount {
            mount_path = "/host/sys"
            name = "sys"
            mount_propagation = "HostToContainer"
            read_only = true

          }

          volume_mount {
            mount_path = "/host/root"
            name = "root"
            mount_propagation = "HostToContainer"
            read_only = true
          }
        }

        volume {
          name = "sys"
          host_path {
            path = "/sys"
          }
        }

        volume {
          name = "root"
          host_path {
            path = "/"
          }
        }
      }
    }
  }
}
