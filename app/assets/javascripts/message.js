$(function() {
  function buildHTML(message){
    var image_tag = `<img src= "${ message.image['url'] }" />`
    var html = `<div class='main-contents__chat-list__text-box'>
                <h4>${ message.name }</h4>
                <div class="post_time"> ${ message.date } </div>
                <div class="post_time">${ message.time }</div>
                <p>${ message.body }</p>
                ${ message.image['url'] ? image_tag : "<img />" }
                </div>`
    return html;
  }

  $("form").submit(function(e){
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
});
