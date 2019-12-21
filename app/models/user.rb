class User < ApplicationRecord
  authenticates_with_sorcery!

  validates :email, :name, presence: true
  validates :email, uniqueness: true
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  has_many :budget_categories

  def budget_categories_for_display
    budget_categories
    .select(:id, :label, :monthly_amount)
    .as_json
  end
end
