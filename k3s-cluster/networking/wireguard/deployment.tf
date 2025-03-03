# Algo
# vrrp checks if VPN is up
# if no, address is given up
resource kubernetes_deployment_v1 wireguard {
  wait_for_rollout = false

  metadata {
    namespace = local.namespace
    name = "wireguard"
  }

  spec {
    selector {
      match_labels = {
        app = "wireguard"
      }
    }

    replicas = 1

    template {
      metadata {
        namespace = local.namespace
        labels = {
          app = "wireguard"
        }
      }

      spec {
        host_network = true

        container {
          image = "linuxserver/wireguard"

          security_context {
            capabilities {
              add = ["SYS_MODULE"]
            }
          }

          resources {
            limits = {
              memory = "512Mi"
              cpu = "150m"
            }

            requests = {
              memory = "256Mi"
              cpu = "100m"
            }
          }

          volume_mount {
            mount_path = "/lib/modules"
            name = "wireguard-modules"
            read_only = true
          }

          env {
            name = "PEERS"
            value = join(",", var.peers)
          }

          port {
            container_port = 51820
            host_port = 51820
            name = "wireguard-port"
            protocol = "UDP"
          }
        }
      }

      volume {
        name = "wireguard-modules"
        host_path {
          path = "/lib/modules"
          type = ""
        }
      }
    }
  }
}
