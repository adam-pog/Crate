class SorceryCore < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :email, null: false, unique: true
      t.string :name, null: false
      t.integer :income, null: false, default: 0
      t.string :crypted_password, null: false
      t.string :salt, null: false

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
