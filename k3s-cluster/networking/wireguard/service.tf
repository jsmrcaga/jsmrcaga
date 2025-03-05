resource kubernetes_service_v1 wireguard {
  wait_for_load_balancer = false

  metadata {
    name = "wireguard"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"
    external_ips = [var.vrrp_virtual_ip]

    selector = {
      app = "wireguard"
    }

    port {
      port = 51820
      protocol = "UDP"
      target_port = "wireguard-p-udp"
      name = "wireguard-udp"
    }

    port {
      port = 51820
      protocol = "TCP"
      target_port = "wireguard-p-tcp"
      name = "wireguard-tcp"
    }

    port {
      port = 51821
      protocol = "TCP"
      target_port = "wireguard-p-web"
      name = "wireguard-web"
    } 
  }
}
