class AddUniqueContraintMonthYear < ActiveRecord::Migration[7.0]
  def change
    add_index :budgets, [:month, :year], :unique => true
  end
end
