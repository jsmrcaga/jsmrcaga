variable kubernetes_config {
	type = string
}

variable pihole {
	type = object({
		password = string	
	})
}

variable plex {
	type = object({
		claim_token = string
	})
}

variable cloudflare {
	type = object({
		api_token = string
	})
}
