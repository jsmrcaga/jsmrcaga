# DNS record
resource cloudflare_record "cloudflare_dns_record" {
  # NOTE: note the usage of local to get the defaulted values
  count = length(local.records)

  # Use every route zone id, or the default zone id
  zone_id = local.records[count.index].zone_id

  name = local.records[count.index].name
  type = local.records[count.index].type
  # was "@" but cloudflare translates to top level domain
  value = local.records[count.index].value

  proxied = local.records[count.index].proxied
}
