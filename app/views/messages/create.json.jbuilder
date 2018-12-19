json.body  @message.body
json.image  @message.image
json.user_id  @message.user.id
json.group_id  @message.group.id
json.date   @message.created_at.strftime('%Y年%m月%d日')
json.time   @message.created_at.strftime('%H:%M:%S')
json.name   @message.user.name
json.id     @message.id
