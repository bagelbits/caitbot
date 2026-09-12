ActiveAdmin.register Trick do
  permit_params :name, :description, :youtubeId, :trickTypeId, apparatus_ids: []

  filter :name
  filter :trick_type

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
