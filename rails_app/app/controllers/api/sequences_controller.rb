class Api::SequencesController < Api::BaseController
  def generate
    apparatus_id = params[:apparatus_id].to_s
    sequence_ids = params[:sequence_ids].to_s.split(",")

    if sequence_ids.empty?
      render json: {}
      return
    end

    sequence = sequence_ids.map do |trick_type_id|
      Trick.joins(:apparatuses)
           .where(apparatuses: { id: apparatus_id }, trickTypeId: trick_type_id)
           .select(:id, :name)
           .to_a
           .sample
    end

    render json: { sequence: sequence }
  end
end
