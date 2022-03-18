module repo {
  source = "git@github.com:jsmrcaga/terraform-modules//github-repo?ref=v0.0.1"

  name = "jsmrcaga"
  description = "My personal repository, home to strange stuff"

  visibility = "public"

  topics = ["readme", "personal", "resume"]
}
