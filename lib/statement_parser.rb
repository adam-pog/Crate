module StatementParser
  def self.parse_file(file_io, year)
    reader = PDF::Reader.new(file_io)

    pages = pages = reader.pages.map do |page| 
      page
        .text
        .split("\n")
        .map(&:squish)
        .reject(&:blank?)
    end
    # lines = reader.pages[0].text.split("\n").map(&:squish).reject(&:blank?)
    transactions = []

    if pages[0][0].include?('DISCOVER IT CHROME')
      pages.each do |page|
        page.each do |line|
          match_data = line.match(/^(\d{2}\/\d{2})(.*)\s(.*)\s(\$\d*\.*\d*)/)
          
          if match_data
            transactions << {
              date: match_data[1],
              source: match_data[2],
              category: match_data[3],
              amount: match_data[4]
            }
          end
        end
      end
    end

    # month1, _ = transactions[0][:date].split('/')
    last_transaction_month, _ = transactions[-1][:date].split('/')

    last_transaction_month == '01' ? year2 = year + 1 : year2 = year

    transactions.each do |transaction|
      month, _ =  transaction[:date].split('/')

      if month == '01' 
        transaction[:date] = "#{year2}/#{transaction[:date]}"
      else
        transaction[:date] = "#{year}/#{transaction[:date]}"
      end
    end
    
    return transactions
  end
end

# require 'pry'
# binding.pry
