module pi_hole {
  source = "./pihole"

  pihole_password = var.pihole.password
}

module plex {
  source = "./plex"

  plex_claim_token = var.plex.claim_token
}

module keepalived_lb {
  source = "./networking/stack"

  name = "keepalived-lb"
  namespace = "keepalived-lb"

  node_selector = {
    lb = true
  }

  vip = "192.168.1.200/24"
  router_id = 51
}

module traefik_override {
  source = "./networking/traefik-k3s-ssl"

  cloudflare_api_token = var.cloudflare.api_token
}

module atlantis {
  source = "./atlantis"

  api_secret = var.atlantis.api_secret
  web_username = var.atlantis.web_username
  web_password = var.atlantis.web_password
}

module grafana {
  source = "./grafana"
}
