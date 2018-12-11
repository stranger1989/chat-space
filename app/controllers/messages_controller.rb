class MessagesController < ApplicationController
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
  end

  def create
    @message = Message.new(create_params)
    if @message.save
      redirect_to group_messages_path(params[:group_id]), notice: 'メッセージが送信されました'
    else
      flash.now[:alert] = 'メッセージを入力してください。'
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
    @group_message = Message.where(group_id: params[:group_id]).order(updated_at: "DESC")
  end
end
