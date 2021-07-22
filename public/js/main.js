const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');

//* Get username and room from url

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username, room);

const socket = io();

//* join room
socket.emit('joinRoom', { username, room });

//* Get room users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
});

socket.on('message', (msg) => {
  outputMessage(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//* Message Submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }
  socket.emit('chatMessage', msg);
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
const outputMessage = (message) => {
  const div = document.createElement('div');
  div.innerHTML = `      <div
  class="
    bg-gray-100
    even:bg-gray-200
    mx-6
    px-4
    py-2
    mt-auto
    overflow-auto
    block
    relative
    transform
    rotate-180
    after:block
  "
>
  <p class="font-semibold">
  ${message.username} <span class="text-gray-500 text-sm">${message.time}</span>
  </p>
  <p class="text mb-1">
    ${message.text}
  </p>
</div>`;
  chatMessages.appendChild(div);
};

// Add room name to DOM
const outputRoomName = (room) => {
  roomName.innerText = room;
};

// // Add users to DOM
// const outputUsers = (users) => {
//   userList.innerHTML = '';
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.innerText = user.username;
//     userList.appendChild(li);
//   });
// };

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
