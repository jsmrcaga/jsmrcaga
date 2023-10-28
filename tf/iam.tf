resource aws_iam_user "s3_explorer" {
  name = "s3-explorer"

}


data aws_iam_policy_document "s3_permissions_policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:Get*",
      "s3:List*"
    ]
    resources = [
      "arn:aws:s3:::test-bucket-jo-files",
      "arn:aws:s3:::test-bucket-jo-files/*"
    ]
  }
}

resource aws_iam_user_policy "s3_user_policy" {
  name = "s3-explorer-permissions"
  user = aws_iam_user.s3_explorer.name
  policy = data.aws_iam_policy_document.s3_permissions_policy.json
}
