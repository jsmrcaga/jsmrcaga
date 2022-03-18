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
