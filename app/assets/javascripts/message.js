$(function() {
  function buildHTML(message){
    var html = `<li>
                <article class='main-contents__chat-list__text-box'>
                <h4>${ message.name }</h4>
                <span> ${ message.time.match(/(\d+)-(\d+)-(\d+)/)[0].replace(/(\d+)-(\d+)-(\d+)/g, "$1年$2月$3日") } </span>
                <span>${ message.time.match(/(\d+):(\d+):(\d+)/)[0] }</span>
                <p>${ message.body }</p>
                <img src= "${ message.image['url'] }" />
                </article>
                </li>`
    return html;
  }

  $("form").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $(this).find("textarea, :text, select").val("").end().find(":checked").prop("checked", false);
    console.log($(this).find("input[name=file]"));
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
