resource kubernetes_daemon_set_v1 keepalived_lb {
  wait_for_rollout = false

  metadata {
    name = var.name
    namespace = local.namespace
  }

  spec {
    selector {
      match_labels = {
        app = var.name
      }
    }

    template {
      metadata {
        name = var.name
        namespace = local.namespace
        labels = {
          app = var.name
        }
      }

      spec {
        node_selector = var.node_selector
        host_network = true

        volume {
          name = "config"
          ephemeral {
            volume_claim_template {
              spec {
                access_modes = ["ReadWriteOnce"]
                resources {
                  limits = {
                    storage = "2Mi"
                  }

                  requests = {
                    storage = "2Mi"
                  }
                }
              }
            }
          }
        }

        container {
          name = "keepalived"
          image = "bsctl/keepalived:0.3.0"
          args = [
            "--vrrp",
            "--log-detail",
            "--dump-conf",
            # from volume
            "--use-file=/etc/keepalived-conf/keepalived.conf",
          ]

          volume_mount {
            name = "config"
            mount_path = "/etc/keepalived-conf"
          }

          security_context {
            privileged = true

            capabilities {
              add = [
                "NET_RAW",
                "NET_ADMIN",
                "NET_BROADCAST"
              ]
            }
          }
        }

        init_container {
          name = "keepalived-conf"
          image = "jsmrcaga/keepalived-conf:v0.0.6"

          security_context {
            privileged = true

            capabilities {
              add = [
                "NET_RAW",
                "NET_ADMIN",
                "NET_BROADCAST"
              ]
            }
          }

          env {
            name = "NODE_IP"
            value_from {
              field_ref {
                field_path = "status.hostIP"
              }
            }
          }

          env {
            name = "CHECK_SCRIPT"
            value = "curl -i $NODE_IP"
          }

          env {
            name = "PASSWORD"
            value = base64encode(random_password.keepalived_pswd.result)
          }

          env {
            name = "VIRTUAL_IP"
            value = var.vip
          }

          env {
            name = "ROUTER_ID"
            value = var.router_id
          }

          env {
            name = "DESTINATION"
            // will be redirected to volume
            value = "/app/output/keepalived.conf"
          }

          env {
            name = "VRRP_INSTANCE_NAME"
            value = var.name
          }

          volume_mount {
            name = "config"
            mount_path = "/app/output"
          }
        }
      }
    }
  }
}
