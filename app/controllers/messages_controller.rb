class MessagesController < ApplicationController
  mount_uploader :image, ImageUploader
  def index
    @group = current_user.groups
    @groop_now = Group.find(params[:group_id])
  end

  def create
  end
end
