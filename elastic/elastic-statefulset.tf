locals {
  data_volume_name = "elastic-data"
}

resource kubernetes_stateful_set_v1 elastic {
  timeouts {
    create = "120s"
    update = "120s"
    delete = "120s"
    read = "10s"
  }

  metadata {
    name = "elastic"
    namespace = local.namespace

    labels = {
      app = "elastic"
    }
  }

  spec {
    service_name = kubernetes_service_v1.elastic.metadata[0].name
    replicas = 1

    selector {
      match_labels = {
        app = "elastic"
      }
    }

    volume_claim_template {
      metadata {
        name = local.data_volume_name
      }

      spec {
        access_modes = ["ReadWriteOnce"]

        resources {
          limits = {
            storage = "5Gi"
          }

          requests = {
            storage = "5Gi"
          }
        }
      }
    }

    template {
      metadata {
        name = "elastic"
        namespace = local .namespace

        labels = {
          name = "elastic"
          app = "elastic"
        }
      }

      spec {
        container {
          name = "elastic"
          image = "elastic/elasticsearch:8.15.2"

          resources {
            limits = {
              memory = "4Gi"
              cpu = "500m"
            }

            requests = {
              memory = "2Gi"
              cpu = "250m"
            }
          }

          # env {
          #   name = "ES_PATH_CONF"
          #   value = "/etc/elasticsearch"
          # }

          env {
            name = "xpack.security.enabled"
            value = "false"
          }

          env {
            name = "discovery.type"
            value = "single-node"
          }

          port {
            # For API
            container_port = 9200
          }

          port {
            # For clustering
            container_port = 9300
          }

          volume_mount {
            name = local.data_volume_name
            mount_path = "/var/data/elasticsearch"
          }

          # volume_mount {
          #   name = "elastic-config"
          #   # this is weird, we give the path, but the filename is in the configmap item
          #   mount_path = "/etc/elasticsearch"
          # }
        }

        volume {
          name = "elastic-config"
          config_map {
            name = kubernetes_config_map_v1.elastic.metadata[0].name
            optional = false

            items {
              key = "content"
              path = "./elasticsearch.yml"
            }
          }
        }

      }
    }
  }
}
