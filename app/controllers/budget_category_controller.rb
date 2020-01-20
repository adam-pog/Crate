class BudgetCategoryController < ApplicationController
  def index
    categories = current_user
      .budget_categories
      .with_amount_spent

    payload = {
      income: current_user.income,
      remaining: current_user.income - categories.sum(&:spent),
      categories: categories.as_json(
        only: [:id, :label, :monthly_amount, :spent, :progress]
      )
    }

    render json: payload, status: :ok
  end

  def create
    category = current_user
      .budget_categories
      .build(budget_category_create_params)

    status = category.save ? :ok : :bad_request

    render json: {}, status: status
  end

  def show
    category = current_user
      .budget_categories
      .with_amount_spent
      .find(params[:id])

    render json: {}, status: :unauthorized if category.user != current_user
    render json: category.details_for_display, status: :ok
  end

  private

  def budget_category_create_params
    params.require(:budget_category).permit(:label, :monthly_amount)
  end
end
