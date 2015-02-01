module EtaCalculator

  def haversine_distance client, car
    a = [client['lat'].to_i, client['lng'].to_i]
    b = [car.position[:lat].to_i, car.position[:lng].to_i]

    rad_per_deg = Math::PI/180  # PI / 180
    rkm = 6371                  # Earth radius in kilometers
    rm = rkm * 1000             # Radius in meters

    dlon_rad = (b[1]-a[1]) * rad_per_deg  # Delta, converted to rad
    dlat_rad = (b[0]-a[0]) * rad_per_deg

    lat1_rad, lon1_rad = a.map! {|i| i * rad_per_deg }
    lat2_rad, lon2_rad = b.map! {|i| i * rad_per_deg }

    a = Math.sin(dlat_rad/2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2)**2
    c = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))

    rm * c # Delta in meters
  end

  def get_eta client, car
    client['lat'] = client['lat'].to_i.round(3)
    client['lng'] = client['lng'].to_i.round(3)
    key = "#{client['lat']}_#{client['lng']}_#{car.id}"
    if $redis.exists(key)
      eta = $redis.get(key).to_i
      $cacher_logger.info "Get ETA from redis - #{eta}"
    else
      eta = (haversine_distance(client, car) * 1.5 / 60).to_i
      $redis.multi do
        $redis.set(key, eta)
        $redis.sadd(car.id, key)
      end
      $cacher_logger.info "Get ETA from EtaCalculator - #{eta}"
    end
    eta
  end

end