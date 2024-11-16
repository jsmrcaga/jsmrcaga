resource kubernetes_deployment_v1 pi_hole {
  wait_for_rollout = false

  metadata {
    name = local.name
    namespace = local.namespace
  }

  spec {
    replicas = 1

    strategy {
      type = "RollingUpdate"
      rolling_update {
        max_surge = 1
        max_unavailable = 1
      }
    }

    selector {
      match_labels = {
        app = local.name
      }
    }

    template {
      metadata {
        name = local.name
        namespace = local.namespace

        labels = {
          app = local.name
        }
      }

      spec {
        node_selector = {
          ethernet-only = "true"
        }

        # https://www.frakkingsweet.com/running-dhcp-in-kubernetes/
        host_network = true
        dns_policy = "ClusterFirst"

        volume {
          name = "pihole-config"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.pi_hole.metadata[0].name
          }
        }

        container {
          name = local.name
          image = "ghcr.io/pi-hole/pihole:2024.07.0"

          security_context {
            privileged = false

            capabilities {
              add = ["NET_ADMIN"]
            }
          }

          volume_mount {
            name = "pihole-config"
            mount_path = "/etc/pihole"
          }

          env {
            name = "TZ"
            value = "Europe/Paris"
          }

          env {
            name = "WEBPASSWORD"
            value = var.pihole_password
          }

          env {
            name = "WEB_PORT"
            value = 8088
          }

          env {
            name = "PIHOLE_DNS_"
            value = "1.1.1.1;8.8.8.8;8.8.4.4"
          }

          env {
            name = "DHCP_ACTIVE"
            value = "true"
          }

          # Copied from Livebox
          env {
            name = "DHCP_START"
            value = "192.168.1.10"
          }

          env {
            name = "DHCP_END"
            value = "192.168.1.150"
          }

          env {
            name = "DHCP_ROUTER"
            value = "192.168.1.1"
          }

          env {
            name = "DNSMASQ_LISTENING"
            value = "all"
          }

          port {
            name = "dns-tcp"
            container_port = local.ports["dns"]
            protocol = "TCP"
          }

          port {
            name = "dns-udp"
            container_port = local.ports["dns"]
            protocol = "UDP"
          }

          port {
            name = "dhcp-1"
            container_port = local.ports["dhcp_1"]
            protocol = "UDP"
          }

          port {
            name = "dhcp-2"
            container_port = local.ports["dhcp_2"]
            protocol = "UDP"
          }

          port {
            name = "web-8088"
            container_port = local.ports["http"]
            protocol = "TCP"
          }
        }
      }
    }
  }
}
