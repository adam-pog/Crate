class BudgetCategory < ApplicationRecord
  validates :label, :monthly_amount, presence: true
  validates :label, uniqueness: true

  scope :with_transactions, -> { includes(:transactions) }
  scope :with_amount_spent, -> do
    with_transactions
    .joins('LEFT JOIN transactions
            ON transactions.budget_category_id = budget_categories.id')
      .select('
        budget_categories.*,
        COALESCE(SUM(transactions.amount), 0) AS spent,
        COALESCE(
          (
            (monthly_amount - sum(transactions.amount)) / monthly_amount) * 100,
            0
          ) as progress
        ')
      .group(:id)
  end

  has_many :transactions
  belongs_to :user

  def details_for_display
    as_json(only: [:id, :label, :monthly_amount])
    .merge({
      transactions: transaction_details,
      spent: spent,
      progress: progress
    })
  end

  private

  def transaction_details
    transactions
    .as_json(only: [:id, :amount, :source, :recurring, :date, :description])
  end
end
