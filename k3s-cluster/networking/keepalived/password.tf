resource random_password keepalived_pswd {
  # keepalived logs show 8 chars truncated password
  length = 8
  special = true
}
