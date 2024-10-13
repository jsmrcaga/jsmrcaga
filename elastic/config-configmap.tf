resource kubernetes_config_map_v1 elastic {
  metadata {
    namespace = local.namespace
    name = "elastic-config"
  }

  data = {
    "content" = file("./config/elasticsearch.yml")
  }
}
