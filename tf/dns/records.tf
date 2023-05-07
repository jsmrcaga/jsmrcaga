# DNS record
resource cloudflare_record "cloudflare_dns_record" {
  # NOTE: note the usage of local to get the defaulted values
  count = length(var.records)

  # Use every route zone id, or the default zone id
  zone_id = coalesce(var.records[count.index].zone_id, var.cloudflare.default_zone_id)

  name = var.records[count.index].name
  type = var.records[count.index].type
  # was "@" but cloudflare translates to top level domain
  value = coalesce(var.records[count.index].value, var.cloudflare.default_record_value)

  proxied = var.records[count.index].proxied
}
