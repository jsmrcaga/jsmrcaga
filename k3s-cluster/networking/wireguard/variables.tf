variable vpn_url {
	type = string
}

variable vrrp_virtual_ip {
	type = string
}

variable vrrp_router_id {
	type = number
	default = 53
}

variable ui_password_bcrypted {
	type = string
	description = "Password for the UI, use bcrypt()"
}
