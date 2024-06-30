resource kubernetes_config_map_v1 prom_config {
  metadata {
    namespace = local.namespace
    name = "prom-config"
  }

  data = {
    "content" = file("./prom.yml")
  }
}

resource random_password prom_pass {
  length = 32
}

locals {
  prom_username = coalesce(var.prom_username, "jsmrcaga")

  prom_password = coalesce(var.prom_password, random_password.prom_pass.result)

  prom_password_bcrytped = bcrypt(local.prom_password, 10)

  prom_users = {
    "${local.prom_username}" = local.prom_password_bcrytped
  }
}

resource kubernetes_config_map_v1 prom_web_config {
  metadata {
    namespace = local.namespace
    name = "prom-web-config"
  }

  data = {
    "content" = sensitive(yamlencode({
      basic_auth_users = local.prom_users
    }))
  }
}
