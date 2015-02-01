class Car
  include Mongoid::Document

  field :position, type: Hash

  scope :free, lambda { where(state: :free) }
  scope :busy, lambda { where(state: :busy) }

  after_update :clear_cache
  before_destroy :clear_cache

  state_machine initial: :free do
    state :busy

    after_transition free: :busy do |car|

    end

    event :freed do
      transition busy: :free
    end

    event :busied do
      transition free: :busy
    end
  end

  def clear_cache
    if $redis.exists(self.id)
      keys = $redis.smembers(self.id)
      $redis.multi do
        keys.each do |key|
          $redis.del(key)
        end
        $redis.del(self.id)
      end
    end
  end
end