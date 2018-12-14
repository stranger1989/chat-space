json.body  @message.body
json.image  @message.image
json.user_id  @message.user.id
json.group_id  @message.group.id
json.time   @message.created_at.to_s
json.name   @message.user.name
