variable kubernetes_config {
	type = string
}

variable env {
  type = object({
    SUPABASE_URL = string
    SUPABASE_API_KEY = string
    TELEGRAM_BOT_TOKEN = string
    TELEGRAM_SECRET_TOKEN = string
    PLASMA_API_KEY = string
  })
}
