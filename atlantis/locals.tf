locals {
	namespace = kubernetes_namespace_v1.atlantis.metadata[0].name
  service_name = kubernetes_service_v1.atlantis_service.metadata[0].name
}
