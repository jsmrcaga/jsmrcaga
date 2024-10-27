locals {
  name = "pi-hole"
  namespace = kubernetes_namespace_v1.pi_hole.metadata[0].name

  ports = {
    dns = 53
    http = 8088
    dhcp_1 = 67
    dhcp_2 = 547
  }
}
