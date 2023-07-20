class UpdateRecurringDefault < ActiveRecord::Migration[7.0]
  def change
    change_column :transactions, :recurring, :boolean, default: false
  end
end
