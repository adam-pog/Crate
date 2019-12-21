class BudgetCategory < ApplicationRecord
  validates :label, :monthly_amount, presence: true
  validates :label, uniqueness: true

  has_many :transactions
end
