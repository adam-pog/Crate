class CreateBudgetCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :budget_categories do |t|
      t.string :name, null: false, unique: true
      t.float :amount, null: false
      t.belongs_to :budget, foreign_key: true, null: false

      t.timestamps
    end
  end
end
