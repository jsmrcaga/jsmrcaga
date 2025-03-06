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
        node_selector = local.node_selector

        security_context {
          sysctl {
            name = "net.ipv4.conf.all.src_valid_mark"
            value = "1"
          }

          sysctl {
            name = "net.ipv4.ip_forward"
            value = "1"
          }
        }

        volume {
          name = "wireguard-config"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.volume_claim.metadata[0].name
          }
        }

        volume {
          name = "wireguard-modules"
          host_path {
            path = "/lib/modules"
            type = ""
          }
        }

        container {
          name = "wireguard"
          # image = "linuxserver/wireguard"
          image = "ghcr.io/wg-easy/wg-easy:14"

          security_context {
            capabilities {
              add = [
                "SYS_MODULE",
                "NET_RAW",
                "NET_ADMIN",
                "NET_BROADCAST"
              ]
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

          volume_mount {
            mount_path = "/etc/wireguard"
            name = "wireguard-config"
          }

          env {
            name = "WG_HOST"
            value = var.vpn_url
          }

          env {
            name = "PASSWORD_HASH"
            value = bcrypt("test-password")
          }

          port {
            container_port = 51820
            host_port = 51820
            name = "wireguard-p-udp"
            protocol = "UDP"
          }

          port {
            container_port = 51820
            host_port = 51820
            name = "wireguard-p-tcp"
            protocol = "TCP"
          }

          port {
            container_port = 51821
            host_port = 51821
            name = "wireguard-p-web"
            protocol = "TCP"
          }
        }
      }
    }
  }
}
