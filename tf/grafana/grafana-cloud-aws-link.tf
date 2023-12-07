data "aws_iam_policy_document" "grafana_policy" {
  statement {
    effect = "Allow"

    principals {
      type = "AWS"
      identifiers = ["arn:aws:iam::${var.grafana.account_id}:root"]
    }

    actions = ["sts:AssumeRole"]

    condition {
      test = "StringEquals"
      variable = "sts:ExternalId"
      values = [var.grafana.cloud_id]
    }
  }
}

resource "aws_iam_role" "grafana_labs_cloudwatch_integration" {
  name = "grafana_cloud_cloudwatch"
  description = "Role used by Grafana CloudWatch integration"

  assume_role_policy = data.aws_iam_policy_document.grafana_policy.json

  # This policy allows the role to discover metrics via tags and export them.
  inline_policy {
    name = "grafana_cloud_cloudwatch_policy"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "tag:GetResources",
            "cloudwatch:GetMetricData",
            "cloudwatch:ListMetrics",
            "apigateway:GET",
            "aps:ListWorkspaces",
            "autoscaling:DescribeAutoScalingGroups",
            "dms:DescribeReplicationInstances",
            "dms:DescribeReplicationTasks",
            "ec2:DescribeTransitGatewayAttachments",
            "ec2:DescribeSpotFleetRequests",
            "shield:ListProtections",
            "storagegateway:ListGateways",
            "storagegateway:ListTagsForResource"
          ]
          Resource = "*"
        }
      ]
    })
  }
}
