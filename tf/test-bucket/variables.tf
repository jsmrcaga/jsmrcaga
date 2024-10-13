variable aws {
  type = object({
    region = optional(string, "eu-west-3")
    shared_credentials_file = string
  })
}
