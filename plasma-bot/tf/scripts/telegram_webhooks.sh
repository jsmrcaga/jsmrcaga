#!/bin/bash

if [[ -z $TELEGRAM_BOT_TOKEN ]]; then
	echo "TELEGRAM_BOT_TOKEN is required as env var"
	exit 1
fi


if [[ -z $SECRET_TOKEN ]]; then
	echo "SECRET_TOKEN is required as env var"
	exit 1
fi


if [[ -z $URL ]]; then
	echo "URL is required as env var"
	exit 1
fi

curl -i https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook \
	-X POST \
	-H "Content-Type: application/json" \
	-d "
		{
			\"url\": \"$URL\",
			\"allowed_updates\": [\"message\"],
			"secret_token": "$SECRET_TOKEN"
		}
	"
