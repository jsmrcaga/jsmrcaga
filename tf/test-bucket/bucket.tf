resource aws_s3_bucket test_bucket_jo_files {
  bucket = "test-bucket-jo-files"

  tags = {
    env = "production"
  }
}
