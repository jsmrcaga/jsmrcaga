variable postgres_version {
  type = string
  default = null
  description = "Postgres image URI"
}

variable flagsmith_image {
  type = string
  default = null
  description = "Flagsmith image URI"
}

variable environment {
  type = string
  default = "production"
}

variable admin_email {
  type = string
}

variable org_name {
  type = string
}

variable project_name {
  type = string
  default = ""
}
