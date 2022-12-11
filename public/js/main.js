const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

const socket = io()

function appendMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${message.username} <span>${message.date}</span></p>
        <p class="text">${message.text}</p>`
  document.querySelector('.chat-messages').appendChild(div)
  chatMessages.scrollTop = chatMessages.scrollHeight
}

socket.on('message', function(message) {
  appendMessage(message)
})


chatForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const input = document.getElementById('msg')
  socket.emit('chatMessage', input.value)
  input.value = ''
  input.focus()
})

document.getElementById('leave-btn').addEventListener('click', function() {
  window.location = '../index.html'
})
