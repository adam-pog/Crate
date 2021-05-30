class Mutations::CreateTransaction < Mutations::BaseMutation
  argument :amount, Integer, required: true
  argument :source, String, required: true
  argument :date, GraphQL::Types::ISO8601DateTime, required: true
  argument :budget_category_id, ID, required: true
  argument :description, String, required: true

  field :transaction, ::Types::TransactionType, null: false

  def resolve(amount:, source:, date:, budget_category_id:, description:)
    budget_category = BudgetCategory.find_by(
      id: budget_category_id,
      user_id: context[:current_user].id
    )

    raise GraphQL::UnauthorizedError if budget_category.nil?

    transaction = Transaction.create(
      amount: amount,
      source: source,
      date: date,
      budget_category_id: budget_category_id,
      description: description
    )

    if transaction.errors.present?
      raise GraphQL::ExecutionError, transaction.errors.full_messages.join(", ")
    else
      { transaction: transaction }
    end
  end
end
