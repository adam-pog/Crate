class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.string :source
      t.float :amount
      t.datetime :date
      t.boolean :recurring
      t.string :description
      t.belongs_to :budget_category, foreign_key: true, null: false

      t.timestamps
    end
  end
end
