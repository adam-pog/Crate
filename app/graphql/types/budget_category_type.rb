module Types
  class BudgetCategoryType < Types::BaseObject
    description 'a budget category'

    field :id, ID, null: false
    field :label, String, null: false
    field :monthly_amount, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :transactions, [::Types::TransactionType], null: false
  end
end
