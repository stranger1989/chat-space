class MessagesController < ApplicationController
  def index
    @group = current_user.groups
  end

  def create
  end
end
