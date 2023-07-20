class CreateBudgets < ActiveRecord::Migration[7.0]
  def change
    create_table :budgets do |t|
      t.string :name, null: false
      t.float :amount, null: false

      t.timestamps
    end
  end
end
