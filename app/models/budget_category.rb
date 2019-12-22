class BudgetCategory < ApplicationRecord
  validates :label, :monthly_amount, presence: true
  validates :label, uniqueness: true

  scope :with_transactions, -> { includes(:transactions) }

  has_many :transactions
  belongs_to :user

  def details_for_display
    as_json(only: [:id, :label, :monthly_amount])
    .merge({
      transactions: transaction_details,
      spent: spent
    })
  end

  private

  def transaction_details
    transactions
    .as_json(only: [:id, :amount, :source, :recurring, :date, :description])
  end

  def spent
    transactions.sum(&:amount)
  end
end
