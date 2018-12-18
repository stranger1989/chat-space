$(function() {
  var search_list = $("#user-search-result");
  var member_list = $("#user-member-list");
  var user_list = new Array();
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix"  id="${ user.id }">
               <p class="chat-group-user__name">
                ${ user.name }
               </p>
               <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-name="${ user.name }" data-id="${ user.id }">
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
  function appendUserToMember(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id="${ user.id }">
                <input name='group[user_ids][]' type='hidden' value='${ user.id }'>
                <p class='chat-group-user__name'>${ user.name }</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-id="${ user.id }" data-name="${ user.name }">削除</a>
                </div>`
    member_list.append(html);
  }
  function click_add_buttion(){
    $(".chat-group-user__btn--add").on('click', function(){
      user = $(this).data();
      if($.inArray(user, user_list) === -1){
        user_list.push(user);
        appendUserToMember(user);
        contents_sort(member_list);
        click_remove_button();
        $(this).parent().remove()
      }
    });
  }
  function click_remove_button(){
    $(".chat-group-user__btn--remove").on('click', function(){
      user = $(this).data();
      $(this).parent().remove();
      appendUser(user)
      user_list.some(function(v, i){
        if (v == user) user_list.splice(i,1);
      });
    });
  }
  function contents_sort(sort_list){
    sort_list.each(function(){
      $(this).html(
        $(this).children().sort(function(a, b) {
      return parseInt($(a).attr('id'), 10) - parseInt($(b).attr('id'), 10);
          })
        );
    });
  }
  function subtract_array(a_array, b_array) {
    var my_result, tmp_f, i, ii;
    my_result = new Array();
    for (i = 0; i < a_array.length; i++) {
      tmp_f = true;
      for (ii = 0; ii < b_array.length; ii++) {
        if (a_array[i] === b_array[ii]) {
          tmp_f = false;
          break;
        }
      }
      if (tmp_f) {my_result.push(a_array[i])}
    }
    return my_result;
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
        });
        click_add_buttion();
        user_list.forEach(function(user){
          search_list.find(`#${ user.id }`).remove();
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
