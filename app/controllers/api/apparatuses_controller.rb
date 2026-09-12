class Api::ApparatusesController < Api::BaseController
  def index
    render json: Apparatus.select(:id, :name)
  end

  def show
    render json: Apparatus.find(params[:id])
  end
end
