class AddUniqueIndexToBudgetCategories < ActiveRecord::Migration[6.0]
  def change
    add_index :budget_categories, :label, unique: true
  end
end
