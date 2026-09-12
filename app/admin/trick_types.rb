ActiveAdmin.register TrickType do
  permit_params :name

  index do
    selectable_column
    id_column
    column :name
    column("Tricks") { |trick_type| trick_type.tricks.count }
    actions
  end

  form do |f|
    f.inputs do
      f.input :name
    end
    f.actions
  end
end
