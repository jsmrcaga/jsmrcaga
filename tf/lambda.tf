# We do this to deploy an empty lambda
data archive_file "dummy_zip" {
  type = "zip"
  output_path = "${path.module}/dummy_lambda.zip"

  source {
    content = "empty"
    filename = "dummy.txt"
  }
}

module svg_lambda {
  aws = {
    shared_credentials_file = "./aws.cred"
  }

	source = "git@github.com:jsmrcaga/terraform-modules//lambda-api?ref=v0.1.5"

  function_name = "github-readme-v2"

  lambda_runtime = "nodejs14.x"
  lambda_handler = "index.handler"

  lambda_filename = data.archive_file.dummy_zip.output_path

  lambda_env = {
    "SPOTIFY_CLIENT_ID" = var.spotify.client_id
    "SPOTIFY_CLIENT_SECRET" = var.spotify.client_secret
    "SPOTIFY_REFRESH_TOKEN" = var.spotify.refresh_token
  }

  include_lambda_logs = true
}
