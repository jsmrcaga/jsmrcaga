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
	source = "git@github.com:jsmrcaga/terraform-modules//lambda-api?ref=v0.0.3"

  function_name = "github-readme-v2"

  lambda_runtime = "nodejs14.x"
  lambda_handler = "index.handler"

  lambda_filename = data.archive_file.dummy_zip.output_path

  lambda_env = {
    "SPOTIFY_CLIENT_ID" = var.spotify.client_id
    "SPOTIFY_CLIENT_SECRET" = var.spotify.client_secret
    "SPOTIFY_REFRESH_TOKEN" = var.spotify.refresh_token
  }
}

resource aws_apigatewayv2_route "route_spotify" {
    route_key = "GET /spotify.svg"
    api_id = module.svg_lambda.api_gateway_api.id
    target = "integrations/${module.svg_lambda.api_gateway_api_integration.id}"
}
