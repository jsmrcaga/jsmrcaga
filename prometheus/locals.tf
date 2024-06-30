locals {
  namespace = kubernetes_namespace_v1.prometheus.metadata[0].name
  service_name = kubernetes_service_v1.prometheus_service.metadata[0].name
  prom_config_dir = "/etc/prometheus"
  prom_config_file = "${local.prom_config_dir}/global/prometheus.yml"
  prom_web_config_file = "${local.prom_config_dir}/web/prometheus-web.yml"
}
