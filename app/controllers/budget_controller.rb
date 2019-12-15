class BudgetController < ApplicationController
  def show
    payload = { budget: { amount: 100, type: 'personal' } }
    render json: {}, status: :ok
  end
end
