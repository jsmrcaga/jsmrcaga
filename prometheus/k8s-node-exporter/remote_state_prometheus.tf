# data terraform_remote_state prometheus {
#   backend = "local"

#   config = {
#     path = "../terraform.tfstate"
#   }
# }

locals {
  # namespace = data.terraform_remote_state.prometheus.kubernetes_namespace_v1.prometheus.metadata[0].name
  namespace = "prometheus"
}
