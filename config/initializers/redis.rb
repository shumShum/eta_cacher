$redis = Redis.new(host: 'localhost', port: 6379)
$cacher_logger = Logger.new("#{Rails.root}/log/cacher.log")