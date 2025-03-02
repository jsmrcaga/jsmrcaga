data http longhorn_1_8_0 {
  url = "https://raw.githubusercontent.com/longhorn/longhorn/v1.8.0/deploy/longhorn.yaml"
}

locals {
  longhorn_manifests = provider::kubernetes::manifest_decode_multi(
    data.http.longhorn_1_8_0.response_body
  )

  longhorn_manifests_map = {
    for manifest in local.longhorn_manifests:
    "${manifest.kind}--${manifest.metadata.name}" => manifest
  }
}

resource kubernetes_manifest longhorn {
  for_each = local.longhorn_manifests_map
  manifest = each.value
}
