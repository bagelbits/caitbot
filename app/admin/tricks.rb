ActiveAdmin.register Trick do
  permit_params :name, :description, :youtubeId, :trickTypeId, apparatus_ids: []

  filter :name
  filter :trick_type

  action_item :import, only: :index do
    link_to "Import CSV", import_admin_tricks_path
  end

  collection_action :import, method: [ :get, :post ] do
    if request.post?
      if params[:file].blank?
        redirect_to import_admin_tricks_path, alert: "Choose a CSV file first."
        next
      end

      result = TrickCsvImporter.new(params[:file]).call
      notice = "Imported #{result.created} trick(s)."
      notice += " Errors: #{result.errors.join('; ')}" if result.errors.any?
      redirect_to admin_tricks_path, notice: notice
    else
      render "admin/tricks/import"
    end
  end

  index do
    selectable_column
    id_column
    column :name
    column :trick_type
    column("Apparatuses") { |trick| trick.apparatuses.map(&:name).join(", ") }
    actions
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :description
      f.input :youtubeId, label: "YouTube ID"
      f.input :trick_type, label: "Trick Type"
      f.input :apparatuses, as: :check_boxes, collection: Apparatus.all
    end
    f.actions
  end
end
