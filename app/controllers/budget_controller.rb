class BudgetController < ApplicationController
  def show
    payload = {
      income: current_user.income,
      categories: current_user.budget_categories_for_display
    }

    render json: payload, status: :ok
  end

  def create_category
    category = current_user.budget_categories.create(budget_category_params)
    status = category ? :ok : :bad_request

    render json: {}, status: status
  end

  private

  def budget_category_params
    params.require(:budget_category).permit(:label, :monthly_amount)
  end
end
