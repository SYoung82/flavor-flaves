class UsersController < ApplicationController
  before_filter :user_is_current_user

  def show
    @user = User.find(params[:id])
    @recipes = @user.recipes
  end

  private

  def user_is_current_user
    unless current_user.id == params[:user_id]
      flash[:notice] = "You may only view your page."
      redirect_to root_path
    end
  end
end
