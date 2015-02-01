class Api::CarsController < Api::ApplicationController

  def index
    @cars = Car.all
  end

  def create
    @car = Car.new(car_params)
    @car.save
    respond_with(@car, location: nil)
  end

  def update
    @car = Car.find(params[:id])
    @car.update_attributes(car_params)
    respond_with(@car, location: nil)
  end

  def switch_state
    @car = Car.find(params[:id])
    case state_params
    when 'free'
      @car.freed
    when 'busy'
      @car.busied
    end
    respond_with(@car, location: nil)
  end

  private

  def car_params
    params.require(:car).permit(position: [:lat, :lng])
  end

  def state_params
    params.require(:state)
  end

end