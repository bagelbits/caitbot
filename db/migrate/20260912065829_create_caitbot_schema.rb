class CreateCaitbotSchema < ActiveRecord::Migration[8.0]
  # Table/column names match the existing production schema created by Prisma
  # (see src/prisma/migrations/20231031160019_init/migration.sql in the old app)
  # so this migration can be adopted against that database without renaming anything.
  def change
    create_table :Apparatus, id: :string do |t|
      t.string :name, null: false
      t.timestamps
    end

    create_table :TrickType, id: :string do |t|
      t.string :name, null: false
      t.timestamps
    end

    create_table :Trick, id: :string do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :youtubeId
      t.string :trickTypeId
      t.timestamps
    end
    add_foreign_key :Trick, :TrickType, column: :trickTypeId, on_delete: :nullify

    create_table :_ApparatusToTrick, id: false do |t|
      t.string :A, null: false
      t.string :B, null: false
    end
    add_index :_ApparatusToTrick, [ :A, :B ], unique: true
    add_index :_ApparatusToTrick, :B
    add_foreign_key :_ApparatusToTrick, :Apparatus, column: :A, on_delete: :cascade
    add_foreign_key :_ApparatusToTrick, :Trick, column: :B, on_delete: :cascade
  end
end
