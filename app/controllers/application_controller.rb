class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include ::ActionController::Cookies

  protect_from_forgery with: :exception
  before_action :require_login
  after_action :set_csrf_cookie

  private

  def set_csrf_cookie
    if session[:user_id]
      cookies['CSRF-Token'] = {
        value: form_authenticity_token,
        expires: 1.hour
      }
    end
  end
end
