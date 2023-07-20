class ApplicationController < ActionController::API
  def index
    render json: {hello: "wld"}
  end
end


