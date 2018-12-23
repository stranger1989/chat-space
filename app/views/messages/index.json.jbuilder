if @new_message.present?
  json.messages @new_message.each do |message|
    json.name     message.user.name
    json.date     message.created_at.strftime('%Y年%m月%d日')
    json.time     message.created_at.strftime('%H:%M:%S')
    json.body     message.body
    json.image    message.image
    json.id       message.id
    json.group_id message.group.id
  end
end
