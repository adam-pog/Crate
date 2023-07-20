class BudgetCategoryController < ActionController::API
  def index
    categories = BudgetCategory
      .select(
        "#{BudgetCategory.table_name}.*", 
        "budgets.month AS month",
        "budgets.year AS year",
        "COALESCE(SUM(transactions.amount), 0) AS spent"
      )      
      .joins(:budget)
      .left_outer_joins(:transactions)
      .where(budget_id: params[:budget_id])
      .group('budget_categories.id, budgets.year, budgets.month')
      .order(:created_at)

    render json: {categories: categories}
  end

  def create
    BudgetCategory.create!(name: params[:name], amount: params[:amount], budget_id: params[:budget_id])
  end

  def show
    category = BudgetCategory
      .select(
        "#{BudgetCategory.table_name}.*", 
        "budgets.month AS month",
        "budgets.year AS year",
        "COALESCE(SUM(transactions.amount), 0) AS spent"
      )      
      .joins(:budget)
      .left_outer_joins(:transactions)
      .where(id: params[:category_id])
      .group('budget_categories.id, budgets.year, budgets.month')
      .order(:created_at)
      .first

    render json: {category: category}
  end

  def update
    BudgetCategory.find(params[:category_id]).update!(name: params[:name], amount: params[:amount])
  end

  def delete
    BudgetCategory.find(params[:category_id]).destroy
  end
end