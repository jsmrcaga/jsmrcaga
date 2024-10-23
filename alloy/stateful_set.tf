resource kubernetes_stateful_set_v1 alloy {
  timeouts {
    create = "30s"
    delete = "30s"
    update = "30s"
    read = "5s"
  }

  metadata {
    namespace = local.namespace
    name = "alloy"

    labels = {
      app = "alloy"
    }
  }

  spec {
    service_name = kubernetes_namespace_v1.alloy.metadata[0].name
    replicas = 2

    selector {
      match_labels = {
        app = "alloy"
      }
    }

    volume_claim_template {
      metadata {
        name = "alloy-data"
      }

      spec {
        // only 1 node will be able to read/write to this volume
        access_modes = ["ReadWriteOnce"]

        resources {
          limits = {
            storage = "2Gi"
          }

          requests = {
            storage = "2Gi"
          }
        }
      }
    }

    template {
      metadata {
        name = "alloy"
        namespace = local.namespace

        labels = {
          app = "alloy"
        }
      }

      spec {
        volume {
          name = "alloy-config"
          config_map {
            name = kubernetes_config_map_v1.alloy_config.metadata[0].name
            optional = false

            items {
              // key in the configmap
              key = "content"
              path = "config.alloy"
              mode = "0444"
            }
          }
        }

        container {
          name = "alloy"
          image = "grafana/alloy:v1.4.3"

          command = []
          args = [
            "run",
            "--disable-reporting",
            "--server.http.listen-addr",
            "0.0.0.0:12345",
            "--storage.path",
            "/etc/allow/data",
            "/etc/alloy/config.alloy"
          ]

          port {
            container_port = 4138
          }

          port {
            container_port = 12345
          }

          env {
            name = "PROMETHEUS_WRITE_ENDPOINT"
            value = "http://prometheus:9090/api/v1/write"
          }

          volume_mount {
            name = "alloy-data"
            mount_path = "/etc/alloy/data"
          }

          volume_mount {
            name = "alloy-config"
            mount_path = "/etc/alloy"
          }

          resources {
            limits = {
              cpu = "120m"
              memory = "180Mi"
            }

            requests = {
              cpu = "120m"
              memory = "120Mi"
            }
          }
        }
      }
    }
  }
}
