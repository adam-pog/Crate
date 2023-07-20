class Budget < ApplicationRecord
  validates :amount, presence: true
  validates :month, uniqueness: { scope: :year }


  has_many :budget_categories, dependent: :destroy
end