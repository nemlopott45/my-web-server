const socket = io(); // Kapcsolódás a szerverhez WebSocketen keresztül

document.getElementById('sendMessage').addEventListener('click', function () {
    let messageInput = document.getElementById('messageInput');
    let chatBox = document.getElementById('chatBox');

    chatBox.style.display = 'flex';
    chatBox.style.flexDirection = 'column';

    if (messageInput.value.trim() !== "") {
        let message = messageInput.value;

        
        socket.emit('chat message', message);

        messageInput.value = ""; 
    }
});


document.getElementById('messageInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('sendMessage').click();
    }
});


socket.on('chat message', function (msg) {
    let chatBox = document.getElementById('chatBox');

    let message = document.createElement('div');
    message.classList.add('user-message');
    message.textContent = msg;
    message.style.backgroundColor = "black";
    message.style.height = "auto";
    message.style.color = "white";
    message.style.display = "block";
    message.style.padding = "10px";
    message.style.borderRadius = "5px";
    message.style.display = "inline-block";
    message.style.width = "fit-content";
    message.style.marginBottom = "5px";

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
});
