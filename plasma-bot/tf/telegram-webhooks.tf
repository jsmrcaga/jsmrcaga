resource terraform_data telegram_webhooks {
  triggers_replace = [
    var.env.TELEGRAM_BOT_TOKEN,
    var.env.TELEGRAM_SECRET_TOKEN
  ]

  provisioner "local-exec" {
    command = "${path.module}/scripts/telegram_webhooks.sh"
    environment = {
      TELEGRAM_BOT_TOKEN = var.env.TELEGRAM_BOT_TOKEN
      SECRET_TOKEN = var.env.TELEGRAM_SECRET_TOKEN
      URL = "https://plasma-bot.jocolina.com/webhooks/telegram"
    }
  }
}
