locals {
  namespace = var.create_namespace ? kubernetes_namespace_v1.namespace[0].metadata[0].name : var.namespace
}
