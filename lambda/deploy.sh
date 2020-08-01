zip -r lambda.zip *
aws lambda update-function-code --function-name github-readme --zip-file fileb://lambda.zip --region eu-west-3
