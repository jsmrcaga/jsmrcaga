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

variable atlantis {
	type = object({
		api_secret = string,
		web_username = string,
		web_password = string
	})

	sensitive = true
}
