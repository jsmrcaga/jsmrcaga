resource kubernetes_cluster_role_v1 alloy_cluster_role {
  metadata {
    name = "alloy-discovery-role"
  }

  rule {
    api_groups = [""]
    resources = [
      "pods",
      "pods/log",
    ]
    resource_names = [] # all
    verbs = ["get", "list"]
  }
}

resource kubernetes_service_account_v1 alloy_sa {
  metadata {
    name = "alloy-service-account"
    namespace = local.namespace
  }
}

# Magic binding between the SA and the Cluster Role
resource kubernetes_cluster_role_binding_v1 alloy_role_binding {
  metadata {
    name = "alloy-sa-cluster-role-binding"
  }

  role_ref {
    kind = "ClusterRole"
    api_group = "rbac.authorization.k8s.io" # this is the only possible value
    name = kubernetes_cluster_role_v1.alloy_cluster_role.metadata[0].name
  }

  subject {
    kind = "ServiceAccount"
    api_group = "" # according to the error "" is the only value for subject
    name = kubernetes_service_account_v1.alloy_sa.metadata[0].name
    namespace = local.namespace
  }
}
