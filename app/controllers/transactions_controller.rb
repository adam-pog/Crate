class TransactionsController < ApplicationController
  before_action :authorize_user

  def index
    render json: {}, status: :ok
  end

  def create
    transaction = budget_category
      .transactions
      .build(transaction_create_params)

    status = transaction.save ? :ok : :bad_request

    render json: {}, status: status
  end

  private

  def transaction_create_params
    params.require(:transaction).permit(:amount, :source, :date, :description, :recurring)
  end

  def authorize_user
    render json: {}, status: :unauthorized if budget_category.user != current_user
  end

  def budget_category
    @budget_category ||= BudgetCategory.find(params[:budget_category_id])
  end
end
