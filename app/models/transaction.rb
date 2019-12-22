class Transaction < ApplicationRecord

  def details_for_display
    formatted_datetime = date
      .in_time_zone('Central Time (US & Canada)')
      .strftime('%b %e, %Y, %l:%M %p %Z')

    self.as_json(only:
      [:id, :amount, :source, :recurring, :date, :description]
    ).merge({
      'date' => formatted_datetime,
    })
  end

  def date
    super
      .in_time_zone('Central Time (US & Canada)')
      .strftime('%-d/%-m/%Y %l:%M')
  end

end
