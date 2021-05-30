module Types
  class MutationType < Types::BaseObject
    field :create_budget_category, mutation: Mutations::CreateBudgetCategory
  end
end
