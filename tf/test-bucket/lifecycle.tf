resource aws_s3_bucket_lifecycle_configuration transition_to_standard_ia {
  bucket = aws_s3_bucket.test_bucket_jo_files.id

  # Cost Storage standard
  # Storage: $0.024
  # Retrieval: $0.00042 (1000 req)
  # Total 50 GB storage / 2 retrieval: 
  # * Storage: 50 * 0.024 = 1.2
  # * Retrieval: 0.00084
  # => 1.20084

  # Cost Standard Infrequent Access 
  # Storage: $0.0131
  # Retrieval: $0.001
  # Total 50 GB storage / 2 retrieval:
  # * Storage: 50 * 0.024 = 0.655
  # * Retrieval: 0.002
  # => 0.657

  # Ratio: 45% reduction
  rule {
    id = "30-day-to-standard-ia"
    status = "Enabled"

    # Applies to all objects in the bucket
    filter {}

    transition {
      // Standard IA only allows 30 day per 30 day
      days = 30
      # GLACIER, STANDARD_IA, ONEZONE_IA, INTELLIGENT_TIERING, DEEP_ARCHIVE, GLACIER_IR
      storage_class = "STANDARD_IA"
    }
  }
}
