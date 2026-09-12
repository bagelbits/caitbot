class Api::TricksController < Api::BaseController
  def index
    render json: Trick.select(:id, :name)
  end

  def show
    trick = Trick.includes(:trick_type, :apparatuses).find(params[:id])
    render json: {
      id: trick.id,
      name: trick.name,
      description: trick.description,
      youtubeId: trick.youtubeId,
      trickTypeId: trick.trickTypeId,
      createdAt: trick.created_at,
      updatedAt: trick.updated_at,
      trickType: trick.trick_type && { id: trick.trick_type.id, name: trick.trick_type.name },
      Apparatus: trick.apparatuses.map { |a| { id: a.id, name: a.name } },
    }
  end
end
