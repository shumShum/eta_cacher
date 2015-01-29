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
    @car.update_attributes(params[:car])
    respond_with(@car, location: nil)
  end

  private

  def car_params
    params.require(:car).permit(position: [:lat, :lng])
  end

end