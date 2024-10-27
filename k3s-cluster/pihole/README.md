<h1 align="center">PiHole</h1>

## Resources

Only a `Deployment` is needed.

Since the Pod will start with `HostNetwork`, the port etc
will be open on the host itself.

This also means that our home router must use the host
IP as the default DNS server for new DHCP leases.


In order to visit PiHole's web UI, we will also need to use the
host IP.

## Config

To get the web UI visible from our machine, we will need to change
`/etc/lighttpd/external.conf`

And add the port we want:
```
server.port = 8088
```
