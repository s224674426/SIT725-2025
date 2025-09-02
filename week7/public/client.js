const s = io();                      // same-origin /realtime page
const status = document.getElementById('status');
const list = document.getElementById('chat');
const form = document.getElementById('form');
const input = document.getElementById('msg');

s.on('connect', () => console.log('connected as', s.id));
s.on('welcome', (d) => (status.textContent = d.msg));
s.on('chat:message', (m) => {
  const li = document.createElement('li');
  li.textContent = m;
  list.appendChild(li);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const v = input.value.trim();
  if (v) s.emit('chat:message', v);
  input.value = '';
});
