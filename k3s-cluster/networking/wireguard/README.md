<h1 align="center">WireGuard</h1>

## Kubelet config

It is necessary to add some specific config so that the kubelet
will allow the `sysctl`s commands we specify

```yml

kubelet-arg:
  - allowed-unsafe-sysctls=net.ipv4.*
```

## VRRP Config

We also configured a Virtual IP for the VPN.
This allows any "server" node to pick up the traffic and redirect
it via the Service to the VPN pod.

## Accessing the UI

```console
k proxy
```

then
```
http://localhost:8001/api/v1/namespaces/wireguard/services/wireguard:51821/proxy/
```
