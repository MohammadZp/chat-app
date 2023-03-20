var stompClient = null;

function connect() {
    var username = document.getElementById("username").value;
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/queue/messages', function (chatMessage) {
            showMessage(JSON.parse(chatMessage.body));
        });
    });
}

function sendMessage() {
    var recipient = document.getElementById("recipient").value;
    var message = document.getElementById("message").value;
    stompClient.send("/app/chat", {}, JSON.stringify({'recipient': recipient, 'message': message}));
}

function showMessage(message) {
    var messages = document.getElementById("messages");
    messages.value += message.sender + ": " + message.message + "\n";
}
