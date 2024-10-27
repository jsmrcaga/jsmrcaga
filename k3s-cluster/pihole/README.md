<h1 align="center">PiHole</h1>

## Resources

Only a `Deployment` is needed.

Since the Pod will start with `host_network`, the port etc
will be open on the host itself.

This also means that our home router must use the host
IP as the default DNS server for new DHCP leases.
If this is not possible, you'll need to deactivate your router DHCP service
and enable the one on the Pi Hole deployment.

In order to visit PiHole's web UI, we will also need to use the
host IP.

