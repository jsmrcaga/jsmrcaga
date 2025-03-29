variable cloudflare_password {
  type = string
  sensitive = true
}

variable hostnames {
  type = list(string)
  description = "List of hostnames for which to update DNS records"
}
