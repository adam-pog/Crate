class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.float :amount, null: false
      t.belongs_to :budget_category, foreign_key: true, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end
