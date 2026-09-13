class Api::TrickTypesController < Api::BaseController
  def index
    scope = TrickType.select(:id, :name)
    if params[:apparatus_id].present?
      scope = scope.joins(tricks: :apparatuses).where(Apparatus.table_name => { id: params[:apparatus_id] }).distinct
    end
    render json: scope
  end

  def show
    render json: TrickType.find(params[:id])
  end
end
