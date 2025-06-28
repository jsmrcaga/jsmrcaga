variable plasma {
  type = object({
    image = string
  })
}

variable networking {
  type = object({
    udp = optional(list(number), [])
    tcp = optional(list(number), [])
    tcp_udp = list(number)
  })
}

variable env {
  type = object({
    TELEGRAM_CHAT_ID = string
  })
}
