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

resource random_password alloy_pass {
  length = 32
}

locals {
  prom_username = coalesce(var.prom_username, "jsmrcaga")

  prom_password = coalesce(var.prom_password, random_password.prom_pass.result)
  prom_alloy_password_bcrypted = bcrypt(random_password.alloy_pass.result)

  prom_password_bcrytped = bcrypt(local.prom_password, 10)

  prom_users = {
    "${local.prom_username}" = local.prom_password
    "alloy" = random_password.alloy_pass.result
  }

  prom_users_bcrypt = {
    for username, password in local.prom_users : username => bcrypt(password)
  }
}

resource kubernetes_config_map_v1 prom_web_config {
  metadata {
    namespace = local.namespace
    name = "prom-web-config"
  }

  data = {
    "content" = sensitive(yamlencode({
      basic_auth_users = local.prom_users_bcrypt
    }))
  }
}

output prom_users {
  sensitive = true
  value = local.prom_users
}
