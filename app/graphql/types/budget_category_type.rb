module Types
  class BudgetCategoryType < Types::BaseObject
    description 'a budget category'

    field :id, ID, null: false
    field :label, String, null: false
    field :monthly_amount, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :transactions, [::Types::TransactionType], null: false
    field :spent, Float, null: false
    field :progress, Float, null: false

    def transactions
      ::AssociationLoader.for(BudgetCategory, :transactions).load(object)
    end

    def spent
      transactions.then do |transactions|
        transactions.sum(&:amount)
      end
    end

    def progress
      spent.then do |amount|
        (amount / object.monthly_amount) * 100
      end
    end
  end
end
