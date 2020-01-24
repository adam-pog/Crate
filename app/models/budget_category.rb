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
        LEAST(
          (COALESCE(sum(transactions.amount), 0) / monthly_amount) * 100,
          100
        ) AS progress
      ')
      .group(:id)
  end

  has_many :transactions
  belongs_to :user

  def details_for_display
    as_json(only: [:id, :label, :monthly_amount])
    .merge({
      transactions: transactions.map(&:details_for_display),
      spent: spent,
      progress: progress
    })
  end
end
