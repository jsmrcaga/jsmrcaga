module jocolina_com {
  source = "./dns"

  cloudflare = {
    default_zone_id = var.cloudflare.zone_id
    default_record_value = "jocolina.com"
  }

  records = [{
    name = "dev"
    type = "A"
    value = "127.0.0.1"
    proxied = false
  }, {
    name = "*.dev"
    type = "A"
    value = "127.0.0.1"
    proxied = false
  },{
    name = "blog"
    type = "CNAME"
    value = "jsmrcaga.github.io"
    proxied = false
  }, {
    value = var.ssh_pub_key
    type = "TXT"
    proxied = false
    name = "jocolina.com"
  }]
}
