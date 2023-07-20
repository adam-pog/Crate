class BudgetController < ActionController::API
  def years
    render json: {years: Budget.pluck(:year).uniq}
  end

  def index
    # categories = BudgetCategory
    #   .select("#{BudgetCategory.table_name}.*, SUM(transactions.amount) AS spent")
    #   .joins(:budget)
    #   .where(budget: {year: params[:year]})
    #   .left_outer_joins(:transactions)
    #   .group('budget_categories.id')
    budgets = Budget
      .select("#{Budget.table_name}.*, COALESCE(budgets.amount - SUM(transactions.amount), budgets.amount) AS net")
      .where(year: params[:year])
      .left_outer_joins(:budget_categories => :transactions)
      .group('budgets.id')
      .order(:created_at)

    render json: {budgets: budgets}
  end

  def show
    render json: Budget.find(params[:id])
  end

  def update
    puts params
    Budget.find(params[:id]).update!(amount: params[:amount], month: params[:month], year: params[:year])
  end

  def delete
    Budget.find(params[:id]).destroy
  end

  def create
    Budget.create!(amount: params[:amount], month: params[:month], year: params[:year])
  end

  def auto_create
    latest_budget = Budget.where(year: params[:year]).order(:created_at).last
    new_year = params[:year].to_i

    if latest_budget.month == 'December'
      new_year = new_year + 1
    end
    
    new_budget = Budget.create!(
      amount: latest_budget.amount, 
      month: Date::MONTHNAMES[(Date::MONTHNAMES.index(latest_budget.month) % 12) + 1], 
      year: new_year
    )

    categories = latest_budget.budget_categories

    categories.each{ |category| new_budget.budget_categories << category.dup }
  end

  def upload_statement
    # DATE PAYMENTS AND CREDITS AMOUNT
    # reader.pages.flat_map{|p| p.text.split("\n").map{|x| x.squish }.reject(&:blank?).include?('DATE PURCHASES MERCHANT CATEGORY AMOUNT') }

    # reader = PDF::Reader.new(params[:file].to_io)

    # lines = reader.pages[0].text.split("\n").map(&:squish).reject(&:blank?)
    # puts 'should be tru ehre'
    # puts lines[0].include?('DISCOVER IT CHROME')

    transactions = detect_categories(StatementParser.parse_file(params[:file].to_io, params[:year]))

    render json: { transactions: transactions }
  end

  def bulk_upload
    budgets = {}
    params[:transactions].each do |parsed_transaction|
      date = parse_date(parsed_transaction[:date])
      if not budgets[date.year]
        budget = Budget.includes(:budget_categories).find_by(year: date.year)
        budgets[date.year] = budget
      end

      transaction = Transaction.new(amount: parsed_transaction[:amount], source: parsed_transaction[:source], date: date)
      category = budgets[date.year].budget_categories.find{ |category| category.name == parsed_transaction[:category] }

      category.transactions << transaction
    end
  end

  private

  def detect_categories(transactions)
    # budget_categories = BudgetCategory.joins(:budget).where(budget: {year: params[:year]})
 
    transactions.map do |transaction|
      if transaction[:source].include?('WALMART') || transaction[:category].include?('Supermarkets')
        transaction[:category] = 'Food'
      elsif transaction[:source].include?('ONECHILD') || transaction[:source].include?('REASONABLE FAITH')
        transaction[:category] = 'Giving'
      elsif transaction[:source].include?('COMCAST')
        transaction[:category] = 'Internet'
      elsif transaction[:category].include?('Travel')
        transaction[:category] = 'Travel'
      elsif transaction[:category].include?('Gasoline')
        transaction[:category] = 'Gas'
      elsif transaction[:category].include?('Merchandise')
        transaction[:category] = 'Hobbies'
      end

      transaction
    end
  end

  def parse_date(month_day)
    month, day, year = month_day.split('/')

    DateTime.new("20#{year}".to_i, month.to_i, day.to_i)
  end
end