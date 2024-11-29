locals {
	namespace = kubernetes_namespace_v1.alloy.metadata[0].name
	# same as in config.alloy
	otel_collector_port = 4318
}
