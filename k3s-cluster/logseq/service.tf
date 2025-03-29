resource kubernetes_service_v1 service {
  wait_for_load_balancer = false

  metadata {
    name = "logseq"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"

    selector = {
      app = "logseq"
    }

    port {
      name = "web"
      port = 5673
      target_port = 80
      protocol = "TCP"
    }
  }
}
