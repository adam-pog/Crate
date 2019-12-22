class BudgetController < ApplicationController
  def show
    categories = current_user
      .budget_categories
      .select(:id, :label, :monthly_amount)
      .as_json

    payload = { income: current_user.income, categories: categories }

    render json: payload, status: :ok
  end

  def create_category
    category = current_user
      .budget_categories
      .build(budget_category_create_params)

    status = category.save ? :ok : :bad_request

    render json: {}, status: status
  end

  def show_category
    category = current_user
      .budget_categories
      .with_transactions
      .find(params[:id])

    render json: {}, status: :unauthorized if category.user != current_user
    render json: category.details_for_display, status: :ok
  end

  private

  def budget_category_create_params
    params.require(:budget_category).permit(:label, :monthly_amount)
  end
end
