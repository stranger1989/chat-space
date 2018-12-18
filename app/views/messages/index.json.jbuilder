json.messages @messages.each do |message|
  json.name     message.user.name
  json.date     message.created_at.strftime('%Y年%m月%d日')
  json.time     message.created_at.strftime('%H:%M:%S')
  json.body     message.body
  json.image    message.image
  json.id       message.id
end
