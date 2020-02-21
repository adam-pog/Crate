class Transaction < ApplicationRecord

  def details_for_display
    self.as_json(only: [:id, :amount, :source, :recurring, :description])
  end
end
