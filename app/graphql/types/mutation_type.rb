module Types
  class MutationType < Types::BaseObject
    field :create_budget_category, mutation: Mutations::CreateBudgetCategory
    field :delete_budget_category, mutation: Mutations::DeleteBudgetCategory
    field :create_transaction, mutation: Mutations::CreateTransaction
  end
end
