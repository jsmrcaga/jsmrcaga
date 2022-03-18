locals {
  records = defaults(var.records, {
    zone_id = var.cloudflare.default_zone_id
    value = var.cloudflare.default_record_value
    proxied = true  
  })
}
