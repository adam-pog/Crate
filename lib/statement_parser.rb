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

    pages.each do |page|
      page.each do |line|
        match_data = line.match(/^\d{2}\/\d{2}\/\d{2}(\s\d{2}\/\d{2}\/\d{2})\s(.*)\s\$\s*(\d*.\d*)\s(.*)/)
        
        if match_data
          unless match_data[4] == 'Payments and Credits'
            transactions << {
              date: match_data[1],
              source: match_data[2],
              amount: match_data[3],
              category: match_data[4]
            }
          end
        end
      end
    end    
    
    return transactions
  end
end

# require 'pry'
# binding.pry
