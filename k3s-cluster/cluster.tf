# Storage
module longhorn {
  source = "./longhorn"
}


# Apps
module plex {
  source = "./plex"

  plex_claim_token = var.plex.claim_token
}

module atlantis {
  source = "./atlantis"

  api_secret = var.atlantis.api_secret
  web_username = var.atlantis.web_username
  web_password = var.atlantis.web_password
}

module flagsmith {
  source = "./flagsmith"

  admin_email = base64decode("am9Aam9jb2xpbmEuY29t")
  org_name = "control"
}


# Monitoring
module grafana {
  source = "./grafana"
}

module scaphandre {
  source = "./scaphandre"
}

module alloy {
  source = "./alloy"

  prometheus_auth = var.alloy.prometheus_auth
}


# Networking
module pi_hole {
  source = "./pihole"

  pihole_password = var.pihole.password
}

module keepalived_lb {
  source = "./networking/keepalived"

  name = "keepalived-lb"
  namespace = "keepalived-lb"

  node_selector = {
    lb = true
  }

  vip = "192.168.1.200/24"
  router_id = 51
}

module keepalived_control {
  source = "./networking/keepalived"

  name = "keepalived-control"
  namespace = "keepalived-control"

  node_selector = {
    "node-role.kubernetes.io/control-plane" = true
  }

  vip = "192.168.1.250/24"
  router_id = 52
}

module traefik_override {
  source = "./networking/traefik-k3s-ssl"

  cloudflare_api_token = var.cloudflare.api_token
}

module ddclient {
  source = "./ddclient"

  cloudflare_password = var.ddclient.cloudflare_password
}

module wireguard {
  source = "./networking/wireguard"

  vpn_url = "home.jocolina.com"
  ui_password_bcrypted = bcrypt(var.wireguard.ui_password)

  vrrp_virtual_ip = "192.168.1.100"
  vrrp_router_id = 53
}
