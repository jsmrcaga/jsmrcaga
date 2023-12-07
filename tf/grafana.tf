module grafana {
  source = "./grafana"

  grafana = {
    cloud_id = var.grafana.cloud_id
    account_id = var.grafana.account_id
  }
}
