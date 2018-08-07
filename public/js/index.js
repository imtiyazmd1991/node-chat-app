var socket = io();
socket.on('connect', function(){
    console.log('connected to the client');
});

function scrollBotton(){
    // get heights
    var messages = jQuery('#messages');
    var lastMessage = messages.children('li:last-child');
    var lastMessageHeight = lastMessage.innerHeight();

    var prevLastMessageHeight = lastMessage.prev().innerHeight();
    var clientHeight = messages.prop('clientHeight');
    var scrollHeight = messages.prop('scrollHeight');
    var scrollTopHeight = messages.prop('scrollTop');
    console.log('scrollHeight', scrollHeight);
    console.log('clientHeight', clientHeight);
    if(clientHeight + scrollTopHeight + lastMessageHeight + prevLastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};

socket.on('newMessage', function(newMessage){
    var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    var html = jQuery("#message-template").html();
    var template = Mustache.render(html,{
        from: newMessage.from,
        text: newMessage.text,
        createdAt: formattedTime
    });
    jQuery("#messages").append(template);
    scrollBotton();

    // var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
    // jQuery("#messages").append(li);
});

jQuery('form').submit(function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:"User",
        text: jQuery("[name=Message]").val()
    }, function(data){
        jQuery("[name=Message]").val('');
        // console.log('received acknowledgement ', data);
    });
});

locationButton = jQuery("#get-location");
locationButton.click(function(){
    if (!navigator.geolocation){
        return;
      }
    locationButton.attr("disabled", true).text("Sending location");
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function(){
            console.log('received acknowledgement location message');
            locationButton.removeAttr("disabled").text("Send location");
        });
    });
});

socket.on('shareLocation', (newLocation)=>{
    var formattedTime = moment(newLocation.createdAt).format('h:mm a');
    var html = jQuery("#location-message-template").html();
    var template = Mustache.render(html ,{
        from: newLocation.from,
        createdAt: formattedTime,
        locationURL: newLocation.url
    });

    jQuery("#messages").append(template);
    scrollBotton();

    // var formattedTime = moment(newLocation.createdAt).format('h:mm a');
    // var li = jQuery(`<li>${newLocation.from} ${formattedTime}: </li>`);
    // var a = jQuery(`<a>Get location</a>`);
    // a.attr("href", newLocation.url);
    // a.attr("target", "_blank");
    // li.append(a);
    // jQuery("#messages").append(li);
});