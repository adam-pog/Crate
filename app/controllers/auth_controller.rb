class AuthController < ApplicationController
  def login
    render json: {you: params[:okat]}
  end
end
