<h1 align="center">Keepalived Conf</h1>

This image generates a very simple keepalived configuration.

You'll need to pass some env-vars to make it work, and
create a volume to retrieve the generated configuration.

It is intended to be used as an `initContainer` in kubernetes deployments.

Example
```sh
 docker run --rm \
 	-e NODE_IP="192.168.1.1" \
 	-e CHECK_SCRIPT="exit 0" \
 	-e PASSWORD="test-psd" \
 	-e VIRTUAL_IP="192.168.1.200" \
 	-e ROUTER_ID=51 \
 	-e DESTINATION="./output/output.conf" \
 	-v "./output:/app/output" \
 	jsmrcaga/keepalived-conf
```
