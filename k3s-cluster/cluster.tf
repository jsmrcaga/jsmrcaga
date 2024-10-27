module pi_hole {
  source = "./pihole"

  pihole_password = var.pihole.password
}

module plex {
  source = "./plex"

  plex_claim_token = var.plex.claim_token
}
