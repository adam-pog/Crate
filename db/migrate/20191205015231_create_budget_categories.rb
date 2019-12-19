class CreateBudgetCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :budget_categories do |t|
      t.string :label, null: false
      t.belongs_to :user, foreign_key: true, null: false
      t.integer :monthly_amount, null: false

      t.timestamps
    end
  end
end
