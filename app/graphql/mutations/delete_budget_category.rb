class Mutations::DeleteBudgetCategory < Mutations::BaseMutation
  argument :id, ID, required: true

  field :budget_category, ::Types::BudgetCategoryType, null: false

  def resolve(id:)
    budget_category = BudgetCategory.find(id)

    return unless budget_category.user_id == context[:current_user].id

    { budget_category: budget_category.destroy }
  end
end
