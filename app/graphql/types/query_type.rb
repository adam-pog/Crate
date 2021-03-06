module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :current_user, UserType, null: false, description: 'a list of users'
    field :users, [UserType], null: false

    def current_user
      context[:current_user]
    end

    def users
      User.all
    end
  end
end
