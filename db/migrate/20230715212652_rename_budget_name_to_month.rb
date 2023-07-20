class RenameBudgetNameToMonth < ActiveRecord::Migration[7.0]
  def change
    rename_column :budgets, :name, :month
  end
end
