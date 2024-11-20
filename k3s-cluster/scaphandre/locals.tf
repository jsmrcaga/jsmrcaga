locals {
  name = "scaphandre"
	namespace = kubernetes_namespace_v1.namespace.metadata[0].name
  prometheus_exporter_port = 9091
}
