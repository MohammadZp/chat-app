var stompClient = null;

function connect(username) {
    var socket = new SockJS('/message');
    stompClient = Stomp.over(socket);
    stompClient.connect({ username: username, }, function() {
        console.log('Web Socket is connected');
        stompClient.subscribe('/users/queue/messages', function(message) {
            $("#message").text(message.body);
        });
    });
}

$(function() {
    $("form").on('submit', function(e) {
        e.preventDefault();
    });
    $("#connect").click(function() {
        connect($("#username").val());
    });
    $("#send").click(function() {
        // stompClient.send("/app/message", {}, JSON.stringify($("#messageForm")));
        alert($("#messageText").val())
        alert($("#name").val())
        stompClient.send("/app/message", {}, JSON.stringify({'to': $("#name").val(),'message': $("#messageText").val()}));
    });
});