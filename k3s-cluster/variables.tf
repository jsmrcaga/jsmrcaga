variable kubernetes_config {
	type = string
}

variable pihole {
	type = object({
		password = string	
	})
}
