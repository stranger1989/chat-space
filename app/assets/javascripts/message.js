$(function() {
  function buildHTML(message){
    var image_tag = `<img src= "${ message.image['url'] }" />`
    var html = `<div class='main-contents__chat-list__text-box chat' data-id=${message.id}>
                <h4>${ message.name }</h4>
                <div class="post_time"> ${ message.date } </div>
                <div class="post_time">${ message.time }</div>
                <p>${ message.body }</p>
                ${ message.image['url'] ? image_tag : "<img />" }
                </div>`
    return html;
  }
  $(".new_message").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $(this).find("textarea").val("");
    $(this).find("input[type=file]").replaceWith($(this).find("input[type=file]").val('').clone(true));
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-contents__chat-list').append(html)
      $('.main-contents__chat-list').animate({scrollTop: $('.main-contents__chat-list').get(0).scrollHeight}, 500);
    })
    .fail(function(){
      alert('送信に失敗しました');
    })
  })

  $(function(){
    setInterval(update, 5000);
  });

  function update(){
    var message_id = $(".main-contents__chat-list .chat:last").data('id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: { id: message_id }
      },
      dataType: 'json'
    })
    .always(function(json){
      $.each(json.messages, function(i, data){
        var html = buildHTML(data);
      $('.main-contents__chat-list').append(html)
      $('.main-contents__chat-list').animate({scrollTop: $('.main-contents__chat-list').get(0).scrollHeight}, 500);
      });
    });
    if($('.main-contents__chat-list .chat')[0]){
      var message_id = $('.main-contents__chat-list .chat').data('id');
    } else {
      var message_id = 0
    }
  }

});
