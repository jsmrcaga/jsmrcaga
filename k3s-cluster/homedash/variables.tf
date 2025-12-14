variable secrets {
	sensitive = true
	type = object({
		UNIFI_LOCAL_ENDPOINT = string
		UNIFI_LOCAL_API_KEY = string
	})
}

variable github {
	sensitive = true
	type = object({
		username = string
		token = string
	})
}
