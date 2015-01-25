class Car
  include Mongoid::Document

  field :position, type: Hash

  state_machine initial: :free do
    state :busy

    after_transition free: :busy do |car|

    end

    event :freed do
      transition busy: :free
    end

    event :busied do
      transition free: :busie
    end
  end
end

# запрос eta - высчитываем для трех ближайших машин - в кеш идет:
# - 3 строки результата вида {lat_lng: eta}
# - 3 строки инвалидаторов вида {car_id: lat_lng}

# машина изменила положение или стейт - удаляем строки из кеша по инвалидаторам