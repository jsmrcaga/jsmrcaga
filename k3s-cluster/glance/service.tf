resource kubernetes_service_v1 service {
  wait_for_load_balancer = false

  metadata {
    name = "glance"
    namespace = local.namespace
  }

  spec {
    type = "ClusterIP"

    selector = {
      app = "glance"
    }

    port {
      name = "glance-web"
      port = 8080
      target_port = local.glance.port
    }
  }
}
