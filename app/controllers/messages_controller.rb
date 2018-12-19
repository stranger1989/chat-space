class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
    @messages = Message.all
    respond_to do |format|
      format.html
      format.json { @new_message = Message.where('id > ?', params[:message][:id]) }
    end
  end

  def create
    @message = Message.new(create_params)
   if @message.save
    respond_to do |format|
      format.html { redirect_to group_messages_path(params[:group_id]) }
      format.json
    end
  else
    render :index
  end
  end

  private
  def create_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id,group_id: params[:group_id])
  end

  def set_group
    @group = current_user.groups
    @group_now = Group.find(params[:group_id])
    @group_message = Message.where(group_id: params[:group_id])
  end
end
