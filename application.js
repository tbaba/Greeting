function login() {
  FB.login(function(response) {
    if(response.authResponse) {
      init();
      $('#me').html('login success!');
    } else {
      alert('login failed...');
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

function send_message() {
  var length = localStorage.length;
  var url = $('#url').attr('value');
  for(var i=0; i<length; i++) {
    FB.ui({
      method:'feed',
      to:localStorage.getItem('key' + i),
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
};

function init() {
  FB.getLoginStatus(function(response) {
    if (response.status != 'connected') {
      $('#me').html = 'You are not connected';
    }
    FB.api({method: 'friends.get'}, function(response) {
      var markup = '';
      var numFriends = response ? Math.min(10, response.length) : 0;
      if (numFriends > 0) {
        for (var i=0; i < numFriends; i++) {
          markup += (
          "<div class='friend' id='" + response[i] + "'>" +
            "<fb:profile-pic uid='" + response[i] + "' linked='false' size='square'></fb:profile-pic>" +
            "</div>"
          );
        }
        $('#friends').html(markup);
        FB.XFBML.parse(document.getElementById('friends'));
      }
    });
  });
}
$().ready(function() {
  FB.init({
    appId  : '163109277086937',
    status : true,
    cookie : true,
    xfbml  : true,
    channelUrl : 'http://localhost/~harakirisoul/channel.html',
    oauth  : true
  });

  init();

  localStorage.clear();

  $('.friend').live('click', function() {
    var key = 'key' + localStorage.length;
    localStorage.setItem(key, $(this).attr('id'));
    $(this).find('img').css('border', '3px solid #069');
  });
});
