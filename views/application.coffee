send_message = (url) ->
  count = $('.friend-selected').length
  i = 0
  while i < count
    div = $('.friend-selected')[i]
    data = $(div).data('id')
    FB.ui { method: 'feed', to: data, from:'tatsuro.baba', link: url }, (response) =>
      if response and response.post_id
        $('#message').append("<p>success!</p>")
      else
        $('#message').append("<p>fail...</p>")
    i++

init = () ->
  FB.getLoginStatus (response) =>
    if response.status isnt 'connected'
      $('#me').html = 'You are not connected'
    FB.api '/me/friends', (response) =>
      markup = ''
      $.each response.data, () ->
        markup += (
          "<li class='friend' id='" + this.id + "'>" +
          "<img src='http://graph.facebook.com/" + this.id + "/picture' />" +
          this.name +
          "</li>"
        )
      $('#friends-selector .user-friends .content').append markup

$ ->
  FB.init
    appId: '163109277086937',
    status: true,
    cookie: true,
    xfbml: true,
    channelUrl: 'http://greeting.dev/channel',
    oauth: true

  FB.Canvas.setAutoResize()

  init()
  
  $('a[rel*=facebox]').facebox()

  $('#login-button').live 'click', () ->
    login()

  $('#logout-button').live 'click', () ->
    logout()

  $('#send-message').live 'click', () ->
    url = $('#choose-photo').find('input:checked').val()
    send_message url

  $(this).bind 'reveal.facebox', () =>
    $('#facebox .user-friends').pajinate {
      items_per_page: 5,
      num_page_links_to_display : 3,
      nav_label_first : ' << ',
      nav_label_last : ' >> ',
      nav_label_prev : ' < ',
      nav_label_next : ' > '
    }

  $('.friend').live 'click', () ->
    if $(this).attr('selected')
      $(this).removeAttr('selected')
      .css('color', 'black')
      .css('background-color', 'white')
      .css('box-shadow', '0px 0px 0px white')
      .css('-webkit-border-radius', '0px')

      $('#friends-selected').remove markup
    else
      $(this).attr('selected', 'selected')
      .css('color', 'white')
      .css('background-color', '#069')
      .css('box-shadow', '0px 0px 10px #069')
      .css('-webkit-border-radius', '3px')

      markup = (
        "<div class='friend-selected' data-id='" +
        $(this).attr('id') +
        "'>" +
        "<img src='http://graph.facebook.com/" +
        $(this).attr('id') +
        "/picture'/></div>"
      )
      $('#friends-selected').append markup

  $('.friend-selected').live 'click', () ->
    $(this).remove()
