# Cluster Role
resource kubernetes_cluster_role_v1 prom_cluster_role {
  metadata {
    name = "prometheus-cluster-role"
  }

  rule {
    api_groups = [""]
    resources = [
      "nodes",
      "nodes/proxy",
      "nodes/metrics",
    ]
    resource_names = [] # all
    verbs = ["get", "list", "watch"]
  }

  rule {
    non_resource_urls = [
      "/metrics",
      "/metrics/cadvisor"
    ]
    verbs = ["get"]
  }
}

resource kubernetes_service_account_v1 prom_sa {
  metadata {
    name = "prometheus-service-account"
    namespace = local.namespace
  }
}

# Magic binding between the SA and the Cluster Role
resource kubernetes_cluster_role_binding_v1 prom_role_binding {
  metadata {
    name = "prom-sa-cluster-role-binding"
  }

  role_ref {
    kind = "ClusterRole"
    api_group = "rbac.authorization.k8s.io" # this is the only possible value
    name = kubernetes_cluster_role_v1.prom_cluster_role.metadata[0].name
  }

  subject {
    kind = "ServiceAccount"
    api_group = "" # according to the error "" is the only value for subject
    name = kubernetes_service_account_v1.prom_sa.metadata[0].name
    namespace = local.namespace
  }
}
