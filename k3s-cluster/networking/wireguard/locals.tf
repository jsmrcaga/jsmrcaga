locals {
  namespace = kubernetes_namespace_v1.wireguard.metadata[0].name

  node_selector = {
    "ethernet-only" = true
  }
}
