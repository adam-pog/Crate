class TransactionController < ActionController::API
  def index
    render json: { 
      transactions: Transaction.where(budget_category_id: params[:category_id]).map do |transaction|
        { 
          id: transaction.id,
          amount: transaction.amount, 
          source: transaction.source, 
          date: transaction.date.day.ordinalize 
        }
      end
    }
  end

  def create
    budget_category = BudgetCategory.find(params[:category_id])
    date = DateTime.new(
      budget_category.budget.year, 
      Date::MONTHNAMES.index(budget_category.budget.month), 
      params[:day]
    )

    Transaction.create!(
      amount: params[:amount], 
      source: params[:source], 
      date: date, 
      budget_category_id: params[:category_id], 
      description: params[:description],
      recurring: params[:recurring]
    )
  end

  def show
    transaction = Transaction.find(params[:transaction_id])
    render json: { 
      transaction: {
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date.day.to_i,
        source: transaction.source
      }
    }
  end

  def update
    transaction = Transaction.find(params[:transaction_id])

    Transaction.find(params[:transaction_id]).update!(
      amount: params[:amount], 
      source: params[:source], 
      date: transaction.read_attribute(:date).change(day: params[:day]), 
      description: params[:description],
      recurring: params[:recurring]
    )
  end 

  def delete
    Transaction.find(params[:transaction_id]).destroy
  end
end