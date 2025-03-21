resource kubernetes_manifest traefik_override {
  // @see: https://docs.k3s.io/helm#customizing-packaged-components-with-helmchartconfig
  manifest = {
    apiVersion = "helm.cattle.io/v1"
    kind = "HelmChartConfig"

    metadata = {
      name = "traefik"
      namespace = "kube-system"
    }

    spec = {
      # fuck HELM :)
      valuesContent = jsonencode({
        persistence = {
          enabled = true
          # only storage-class enabled in k3s by default
          storageClass = "longhorn"

          # These are defaults anyway, but this way we see
          # where the f*** the volumeMount in the initContainer
          # gets the name/path from
          name = "data"
          path = "/data"
          size = "128Mi"
        }

        # certificatesResolvers = {
        # k3s is using the chart version 27
        # wich for some fucking reason uses certResolvers instead
        # @see: https://github.com/traefik/traefik-helm-chart/blob/4dadd6632db95549a211006844e5e7310e06f4a2/EXAMPLES.md?plain=1#L355
        certResolvers = {
          letsencrypt = {
            # acme = {
            # Also for some fucking reason it assumes it's acme
            # fuck the rest I guess. Holy shit this is real bs
            dnsChallenge = {
              provider = "cloudflare"
            }
            storage = "/data/acme.json"
            # }
          }
        }

        env = [{
          name = "CF_DNS_API_TOKEN"
          valueFrom = {
            secretKeyRef = {
              name = kubernetes_secret_v1.cloudflare_api_token.metadata[0].name
              key = "token"
            }
          }
        }]

        deployment = {
          # we add an initContainer to create the 0600 file for the certs
          # @see: https://github.com/traefik/traefik-helm-chart/blob/ae13d4bd58df4f1a7bbf25db34c8221e08756602/EXAMPLES.md?plain=1#L357
          initContainers = [{
            name = "volume-permissions"
            image = "busybox:latest"
            command =  ["sh", "-c", "touch /data/acme.json; chmod -v 600 /data/acme.json"]
            volumeMounts = [{
              mountPath = "/data"
              name = "data"
            }]
          }]
        }

        podSecurityContext = {
          fsGroup = 65532
          fsGroupChangePolicy = "OnRootMismatch"
        }

        # Fucking helm chart enables prometheus metrics by default
        # but not the fucking service to contact the fucking thing
        metrics = {
          prometheus = {
            service = {
              enabled = true
            }
          }
        }
      })
    }
  }
}
