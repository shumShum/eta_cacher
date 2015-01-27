class Api::CarsController < Api::ApplicationController

  def index
    @cars = Car.all
  end

  def create
    @car = Car.new(params[:car])
    @comment.save
    respond_with(@car, location: nil)
  end

  def update
    @car = Car.find(params[:id])
    @car.update_attributes(params[:car])
    respond_with(@car, location: nil)
  end

end