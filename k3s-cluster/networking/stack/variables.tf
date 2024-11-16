variable name {
	type = string
}

variable namespace {
	type = string
}

variable node_selector {
	type = map(string)
}

variable vip {
	type = string
	description = "VirtulIP containing mask. Example: 192.168.1.200/24"
}

variable router_id {
	type = number
	default = 51
}
