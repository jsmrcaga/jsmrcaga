module repo {
  source = "git@github.com:jsmrcaga/terraform-modules//github-repo?ref=v0.1.0"

  name = "jsmrcaga"
  description = "My personal repository, home to strange stuff"

  visibility = "public"

  topics = ["readme", "personal", "resume"]

  actions = {
    secrets = {
      AWS_ACCESS_KEY_ID = var.aws.key_id
      AWS_SECRET_ACCESS_KEY = var.aws.secret
    }
  }

  pages = {
    cname = "blog.jocolina.com"
    github_actions = true
  }

  github = {
    token = var.github.token
  }
}
