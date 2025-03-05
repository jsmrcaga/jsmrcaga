variable vpn_url {
	type = string
}

variable peers {
	type = list(string)
	description = "List of allowed peers"
}

variable vrrp_virtual_ip {
	type = string
}

variable vrrp_router_id {
	type = number
	default = 53
}
