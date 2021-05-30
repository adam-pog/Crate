class Transaction < ApplicationRecord
  validates :amount, :source, :date, :description, presence: true

  belongs_to :budget_category

  def details_for_display
    self.as_json(only: [:id, :amount, :source, :recurring, :description])
  end
end
