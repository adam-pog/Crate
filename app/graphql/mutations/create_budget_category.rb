class Mutations::CreateBudgetCategory < Mutations::BaseMutation
  argument :label, String, required: true
  argument :monthly_amount, Integer, required: true

  field :budget_category, ::Types::BudgetCategoryType, null: false

  def resolve(label:, monthly_amount:)
    budget_category = BudgetCategory.new(
      label: label,
      monthly_amount: monthly_amount
    )

    context[:current_user].budget_categories << budget_category

    if budget_category.errors.present?
      raise GraphQL::ExecutionError, budget_category.errors.full_messages.join(", ")
    else
      { budget_category: budget_category }
    end
  end
end
