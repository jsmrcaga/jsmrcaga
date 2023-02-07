locals {
  records = [for record in var.records : merge(record, {
    zone_id = coalesce(record.zone_id, var.cloudflare.default_zone_id)
    value = coalesce(record.value, var.cloudflare.default_record_value)
    proxied = coalesce(record.proxied, true)
  })]
}
