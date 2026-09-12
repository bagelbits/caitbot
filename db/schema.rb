# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_09_12_070759) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "Apparatus", id: :string, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "Trick", id: :string, force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "youtubeId"
    t.string "trickTypeId"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "TrickType", id: :string, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "_ApparatusToTrick", id: false, force: :cascade do |t|
    t.string "A", null: false
    t.string "B", null: false
    t.index ["A", "B"], name: "index__ApparatusToTrick_on_A_and_B", unique: true
    t.index ["B"], name: "index__ApparatusToTrick_on_B"
  end

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  add_foreign_key "Trick", "TrickType", column: "trickTypeId", on_delete: :nullify
  add_foreign_key "_ApparatusToTrick", "Apparatus", column: "A", on_delete: :cascade
  add_foreign_key "_ApparatusToTrick", "Trick", column: "B", on_delete: :cascade
end
