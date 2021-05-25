class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ::ActionController::Cookies

  protect_from_forgery with: :exception
  before_action :require_login
  after_action :set_csrf_cookie

  private

  def set_csrf_cookie
    cookies['CSRF-Token'] = {
      value: form_authenticity_token,
      expires: 1.hour
    }
  end

  def not_authenticated
    render json: {}, status: :unauthorized
  end
end
