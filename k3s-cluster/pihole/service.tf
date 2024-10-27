resource kubernetes_service_v1 pi_hole {
  wait_for_load_balancer = false

	metadata {
    name = local.name
    namespace = local.namespace
  }

  spec {
    type = "LoadBalancer"

    selector = {
      app = local.name
    }

    external_traffic_policy = "Cluster"

    # TCP
    port {
      name = "dns-tcp"
      port = local.ports["dns"]
      target_port = local.ports["dns"]
      protocol = "TCP"
    }

    port {
      name = "http"
      port = local.ports["http"]
      target_port = local.ports["http"]
      protocol = "TCP"
    }

    # UDP
    port {
      name = "dns-udp"
      port = local.ports["dns"]
      target_port = local.ports["dns"]
      protocol = "UDP"
    }

    port {
      name = "dhcp-1"
      port = local.ports["dhcp_1"]
      target_port = local.ports["dhcp_1"]
      protocol = "UDP"
    }

    port {
      name = "dhcp-2"
      port = local.ports["dhcp_2"]
      target_port = local.ports["dhcp_2"]
      protocol = "UDP"
    }
  }
}
