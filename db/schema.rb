# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_05_020013) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "budget_categories", force: :cascade do |t|
    t.string "label", null: false
    t.bigint "budget_id", null: false
    t.integer "monthly_amount", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["budget_id"], name: "index_budget_categories_on_budget_id"
  end

  create_table "budgets", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "type", null: false
    t.integer "monthly_amount", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_budgets_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.float "amount", null: false
    t.bigint "budget_category_id", null: false
    t.text "description", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["budget_category_id"], name: "index_transactions_on_budget_category_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "budget_categories", "budgets"
  add_foreign_key "budgets", "users"
  add_foreign_key "transactions", "budget_categories"
end
