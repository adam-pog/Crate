module Types
  class TransactionType < Types::BaseObject
    description 'a budget category'

    field :id, ID, null: false
    field :amount, Integer, null: false
    field :monthly_amount, Float, null: false
    field :source, String, null: false
    field :date, GraphQL::Types::ISO8601DateTime, null: false
    field :budget_category_id, ID, null: false
    field :description, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
