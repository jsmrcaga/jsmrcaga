module virtual_ip {
	source = "../keepalived"

  name = "wireguard"
  namespace = local .namespace
  create_namespace = false

  node_selector = local.node_selector

  vip = "${var.vrrp_virtual_ip}/24"
  router_id = var.vrrp_router_id
}
