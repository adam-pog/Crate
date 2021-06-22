module Types
  class UserType < Types::BaseObject
    description 'a user'

    field :id, ID, null: false
    field :email, String, null: false
    field :name, String, null: false
    field :income, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :budget_categories, [::Types::BudgetCategoryType], null: false do
      argument :id, ID, required: false
    end

    def budget_categories(id: nil)
      query = id ? { id: id } : {}

      BudgetCategory.where(query)
    end
  end
end
