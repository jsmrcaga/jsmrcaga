locals {
  name = "pi-hole"
  namespace = kubernetes_namespace_v1.pi_hole.metadata[0].name

  lighttpd_port = 8088

  ports = {
    dns = 53
    http = 80
    dhcp_1 = 67
    dhcp_2 = 547
  }
}
