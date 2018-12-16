$(function() {
  var search_list = $("#user-search-result");
  var member_list = $("#user-member-list");
  var user_list = new Array();

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix"  id="${ user.id }">
               <p class="chat-group-user__name">
                ${ user.name }
               </p>
               <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" id="${ user.id }" name="${ user.id }">
                 追加
               </a>
               </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user }</p>
                </div>`
    search_list.append(html);
  }

  function appendMemberToUser(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id="${ user.id }">
                <input name='group[user_ids][]' type='hidden' value='${ user.id }'>
                <p class='chat-group-user__name'>${ user.name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' id="${ user.id }">削除</a>
                </div>`
    member_list.append(html);
  }

  $(".chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {

      search_list.empty();

      if (users.length !== 0) {
        users.forEach(function(user){

          appendUser(user);

          search_list.find(`a#${ user.id }`).on('click', function(){

            if($.inArray(user, user_list) === -1){
              user_list.push(user);
              appendMemberToUser(user);

              member_list.each(function(){
                $(this).html(
                  $(this).children().sort(function(a, b) {
                return parseInt($(a).attr('id'), 10) - parseInt($(b).attr('id'), 10);
                    })
                  );
              });

              member_list.find(`a#${ user.id }`).on('click', function(){
                member_list.find(`#${ user.id }`).remove()
                  appendUser(user)
                  user_list.some(function(v, i){
                    if (v == user) user_list.splice(i,1);
                  });
              });
            }
            search_list.find(`#${ user.id }`).remove()
          });

          user_list.forEach(function(user){
            search_list.find(`#${ user.id }`).remove();
          });

        });
      }
      else {
        appendNoUser("一致するユーザーは存在しません。");
      }
    })

    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    })

  });
});
