locals {
  namespace = kubernetes_namespace_v1.namespace.metadata[0].name

  networking_tcp = concat(var.networking.tcp, var.networking.tcp_udp)
  networking_udp = concat(var.networking.udp, var.networking.tcp_udp)
}
