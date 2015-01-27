class Api::EtaController < Api::ApplicationController
  include EtaCalculator

  def show
    # client = params[:client]
    client = {
      position: {
        lat: 5,
        lng: 5
      }
    }
    cars = Car.all.sort{ |c1, c2| haversine_distance(client, c1) <=> haversine_distance(client, c2)}[0..2]
    @eta = cars.inject(0){|sum, car| sum + get_eta(client, car)} / 3
  end

end