var socket = io.connect("http://192.168.0.244:6677", { forceNew: true });

socket.on("messages", function (data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data
    .map(function (message, index) {
      return `
      <div class="message">
        <strong>${message.nickname}</strong> dice:
        <p>${message.texto}</p>
      </div>
    `;
    })
    .join(" ");

  var div_msg = document.getElementById("messages");
  div_msg.innerHTML = html;
  div_msg.scrollTop = div_msg.scrollHeight;
}

function addMessage() {
  var message = {
    nickname: document.getElementById("nickname").value,
    texto: document.getElementById("text").value,
  };

  document.getElementById("nickname").style.display = "none";
  document.getElementById("text").value = "";
  socket.emit("add-message", message);

  return false;
}
