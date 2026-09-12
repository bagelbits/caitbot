class Api::TrickTypesController < Api::BaseController
  def index
    render json: TrickType.select(:id, :name)
  end

  def show
    render json: TrickType.find(params[:id])
  end
end
