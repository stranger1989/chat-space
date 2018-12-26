require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: Rails.application.secrets.aws_access_key_id,
    aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
    region: 'ap-northeast-1',
    host: 's3.example.com',
    endpoint: 'https://s3.example.com:8080'
  }

  config.fog_directory  = 'update-image'
  config.fog_public     = false
  config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/update-image'
end