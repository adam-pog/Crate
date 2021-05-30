module Types
  class BudgetCategoryType < Types::BaseObject
    description 'a budget category'

    field :id, ID, null: false
    field :label, String, null: false
    field :monthly_amount, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :transactions, [::Types::TransactionType], null: false

    def transactions
      BatchLoader::GraphQL.for(object.id).batch(default_value: []) do |budget_category_ids, loader|
        Transaction.where(budget_category_id: budget_category_ids).each do |transaction|
          loader.call(transaction.budget_category_id) { |memo| memo << transaction }
        end
      end
    end
  end
end
