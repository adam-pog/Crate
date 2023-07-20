class AddYearToBudget < ActiveRecord::Migration[7.0]
  def change
    add_column :budgets, :year, :integer, null: false
  end
end
