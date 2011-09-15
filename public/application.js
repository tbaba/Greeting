function login() {
  FB.login(function(response) {
    if(response.authResponse) {
      init();
      $('#me').html('login success!');
    } else {
      $('#me').html('login failed...');
    }
  });
}

function logout() {
  FB.logout(function(response) {
    if(response.authResponse) {
      $('#me').html('logout success');
    } else {
      $('#me').html('logout failed...');
    }
  });
}

function send_message(url) {
  var count = $('.friend-selected').length;
  var i = 0;
  while(i < count) {
    var div = $('.friend-selected')[i];
    var data = $(div).data('id');
    FB.ui({
      method: 'feed',
      to: data,
      from:'tatsuro.baba',
      link: url
    }, function(response) {
      if(response && response.post_id) {
        $('#message').append("<p>送信しました。</p>");
      } else {
        $('#message').append("<p>送信できませんでした。</p>");
      }
    });
    i++;
  }
  /*
  $('#friends-selected').find('.friend').each(function() {
    if($(this).data('id')) {
      FB.ui({
        method:'feed',
        to: $(this).data('id'),
        from:'tatsuro.baba',
        link: url
      }, function(response) {
        if(response && response.post_id) {
          alert('published');
        } else {
          alert('cant published');
        }
      });
    }
  });
  */
};

function init() {
  FB.getLoginStatus(function(response) {
    if (response.status != 'connected') {
      $('#me').html = 'You are not connected';
    }
    FB.api('/me/friends', function(response) {
      var markup = '';
      $.each(response.data, function() {
        markup += (
          "<li class='friend' id='" + this.id + "'>" +
          "<img src='http://graph.facebook.com/" + this.id + "/picture' />" +
          this.name +
          "</li>"
        );
      });
      $('#friends-selector .user-friends .content').append(markup);
    });
  });
}

$().ready(function() {
  FB.init({
    appId  : '163109277086937',
    status : true,
    cookie : true,
    xfbml  : true,
    channelUrl : 'http://localhost/~harakirisoul/greeting/channel.html',
    oauth  : true
  });

  init();

  $('a[rel*=facebox]').facebox();

  FB.Canvas.setAutoResize();

  /*
   * 友達を選択する機能のアイディア
   *
   * faceboxで友達リストを表示
   * ↓
   * 友達を選択
   * ↓
   * 別のdivに友達を表示する（それぞれのオブジェクトにselected属性を付けておく
   * ↓
   * 実際にmessageを送る際にはそこから送る人を特定して送信
   */
  $('.friend').live('click', function() {
    if($(this).attr('selected')) {
      $(this).removeAttr('selected');
      $(this).css('color', 'black');
      $(this).css('background-color', 'white');
      $(this).css('box-shadow', '0px 0px 0px white');
      $(this).css('-webkit-border-radius', '0px');

      $('#friends-selected').remove(markup);
    } else {
      $(this).attr('selected', 'selected');
      $(this).css('color', 'white');
      $(this).css('background-color', '#069');
      $(this).css('box-shadow', '0px 0px 10px #069');
      $(this).css('-webkit-border-radius', '3px');

      var markup = (
        "<div class='friend-selected' data-id='" + $(this).attr('id') + "'>" + "<img src='http://graph.facebook.com/" + $(this).attr('id') + "/picture' />" + "</div>"
      );
      $('#friends-selected').append(markup);
    }
  });

  $('#send-message').live('click', function() {
    var url = $('#url').attr('value');
    send_message(url);
  });

  $(this).bind('reveal.facebox', function() {
    $('#facebox .user-friends').pajinate({
      items_per_page: 5,
      num_page_links_to_display : 3,
      nav_label_first : ' << ',
      nav_label_last : ' >> ',
      nav_label_prev : ' < ',
      nav_label_next : ' > '
    });
  });
});
