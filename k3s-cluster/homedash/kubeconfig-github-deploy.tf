module kubeconfig {
  source = "git@github.com:jsmrcaga/terraform-modules//kubernetes/kubeconfig?ref=v0.3.0"

  cluster_name = "homelab"
  ca_data = var.kube.ca_data
  k8s_server_address = var.kube.server_address
  namespace = local.namespace
}

resource github_actions_secret github_deployer_secret {
  repository = "jsmrcaga"
  secret_name = "KUBE_CLUSTER_B64_HOMEDASH"
  plaintext_value = base64encode(module.kubeconfig.kubeconfig)
}
