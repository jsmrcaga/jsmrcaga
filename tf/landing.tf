# Handle custom domain if needed
resource "cloudflare_record" "landing_custom_domain_dns_record" {
  # only set domain if needed
  zone_id = var.cloudflare.zone_id
  # Naive subdomain spliting to get only the xxx part
  name = "@"
  value = "76.76.21.21"
  type = "A"
  ttl = 3600
  proxied = false
}

# This used to be a cloudflare pages redirection
# resource "cloudflare_record" "landing_custom_domain_dns_record" {
#   # only set domain if needed
#   zone_id = var.cloudflare.zone_id
#   # Naive subdomain spliting to get only the xxx part
#   name = "@"
#   value = "129.0.2.1" # i'm not sure where this IP comes from
#   type = "A"
#   ttl = 3600
#   proxied = false
# }

# Create vercel project
resource "vercel_project" "landing" {
  name = "jocolina"
  framework = "nextjs"
  
  environment = []

  # We don't need a root directory because we are manually deploing via github actions
  # root_directory = "landing"

  git_repository = null
}

# Attach domain to project
resource "vercel_project_domain" "landing_custom_domain" {
  project_id = vercel_project.landing.id
  domain = "jocolina.com"
}
