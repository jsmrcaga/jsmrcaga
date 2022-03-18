variable records {
  type = list(object({
    zone_id = optional(string)
    name = string
    type = string
    value = optional(string)
    proxied = optional(string)
  }))
}

variable cloudflare {
  type = object({
    default_zone_id = optional(string)
    default_record_value = optional(string)
  })
}
