class ApplicationController < ActionController::API
  include ::ActionController::Cookies

  def wow
    render json: {you: 'didit'}
  end
end
