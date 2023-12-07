variable cloudflare {
  type = object({
    api_key = string
    email = string
    zone_id = string
    account_id = string  
  })
}

variable github {
  type = object({
    token = string  
  })
}

variable spotify {
  type = object({
      client_id = string
      client_secret = string
      refresh_token = string
  })
}

variable aws {
  type = object({
    key_id = string
    secret = string  
  })
}

variable vercel {
  type = object({
    token = string
  })
}

variable ssh_pub_key {
  type = string
}

variable grafana {
  type = object({
    cloud_id = string
    account_id = string
  })
}
