$(function() {
  function buildHTML(message){
    var image_tag = `<img src= "${ message.image['url'] }" />`
    var html = `<div class='main-contents__chat-list__text-box chat data-id=${message.id}'>
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
      $('.main-contents__chat-list ul').append(html)
      $('.main-contents__chat-list').animate({scrollTop: $('.main-contents__chat-list').get(0).scrollHeight}, 500);
    })
    .fail(function(){
      alert('送信に失敗しました');
    })
  })
    var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    $.ajax({
      url: location.href.json,
      dataType:'json',
      processData: false,
      contentType: false
    })
    .done(function(json) {
      var id = $(".main-contents__chat-list ul .chat:last").data('id');
      var insertHTML = '';
      json.messages.forEach(function(message) {
        if (message.id > id ) {
          insertHTML += buildHTML(message);
          $('.main-contents__chat-list').animate({scrollTop: $('.main-contents__chat-list').get(0).scrollHeight}, 500);
        }
      });
      $('.main-contents__chat-list ul').append(insertHTML);
    })
    .fail(function(json) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(interval);
   }} , 5 * 1000 );
});
