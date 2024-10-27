module pi_hole {
  source = "./pihole"

  pihole_password = var.pihole.password
}

module plex {
  source = "./plex"
}
