class CreateBudgets < ActiveRecord::Migration[6.0]
  def change
    create_table :budgets do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.string :type, null: false
      t.integer :monthly_amount, null: false

      t.timestamps
    end
  end
end
