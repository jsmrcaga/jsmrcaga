resource kubernetes_config_map_v1 ddclient_config {
  metadata {
    name = local.name
    namespace = local.namespace
  }

  data = {
    config = <<CONFIG
      ssl=true \
      protocol=cloudflare \
      use=web, web=ipify-ipv4 \
      login=token \
      zone=jocolina.com \
      password='${var.cloudflare_password}' \
      home.jocolina.com, snitch.jocolina.com, em-api.jocolina.com, grafana.jocolina.com, prometheus.jocolina.com, atlantis.jocolina.com, elastic.jocolina.com, flags.jocolina.com
    CONFIG
  }
}
