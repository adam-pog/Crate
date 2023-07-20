class BudgetCategory < ApplicationRecord
  validates :name, :amount, presence: true
  validates :name, uniqueness: { scope: :budget_id }

  # scope :with_transactions, -> { includes(:transactions) }
  # scope :with_amount_spent, -> do
  #   with_transactions
  #   .joins('LEFT JOIN transactions
  #           ON transactions.budget_category_id = budget_categories.id')
  #     .select('
  #       budget_categories.*,
  #       COALESCE(SUM(transactions.amount), 0) AS spent,
  #       LEAST(
  #         (COALESCE(sum(transactions.amount), 0) / monthly_amount) * 100,
  #         100
  #       ) AS progress
  #     ')
  #     .group(:id)
  # end

  has_many :transactions, dependent: :destroy
  belongs_to :budget
  #
  # def details_for_display
  #   as_json(only: [:id, :label, :monthly_amount])
  #   .merge({
  #     transactions: grouped_transactions,
  #     spent: spent,
  #     progress: progress
  #   })
  # end


  private

  def grouped_transactions
    transactions.each_with_object({}) do |transaction, group|
      key = transaction.date.strftime('%b %e, %Y')
      group[key] ||= []
      group[key] << transaction.details_for_display
    end
  end
end