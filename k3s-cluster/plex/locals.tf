locals {
  name = "plex"
  namespace = kubernetes_namespace_v1.plex.metadata[0].name

  main_storage_class_name = "local-path"
  # taken from
  # https://github.com/plexinc/pms-docker/blob/c8e17655441744e88dd3b45f96f824052fda79a3/README.md#bridge-networking
  plex_ports = [{
    port = 32400
    protocol = "TCP"
  }, {
    port = 8324
    protocol = "TCP"
  }, {
    port = 32469
    protocol = "TCP"
  }, {
    port = 1900
    protocol = "UDP"
  }, {
    port = 32410
    protocol = "UDP"
  }, {
    port = 32412
    protocol = "UDP"
  }, {
    port = 32413
    protocol = "UDP"
  }, {
    port = 32414
    protocol = "UDP"
  }]

  volumes = [{
    name = "plex-media"
    volume_name = kubernetes_persistent_volume_v1.media_volume.metadata[0].name
    container_path = "/data"
    capacity = "246Gi"
  }, {
    name = "plex-transcoding"
    volume_name = null
    container_path = "/transcode"
    capacity = "35Gi"
  }, {
    name = "plex-db"
    volume_name = null
    container_path = "/config"
    capacity = "10Gi"
  }, ]
}
