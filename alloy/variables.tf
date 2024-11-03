variable kubernetes_config {
  type = string
}

variable prometheus_auth {
  sensitive = true
  type = object({
    username = string
    password = string
  })
}
