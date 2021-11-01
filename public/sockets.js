const socket = io();
      
const saveNote = (title, price, thumbnail) => {
    socket.emit('client:newnote', {
      title,
      price,
      thumbnail
    })
};

socket.on('server:newnote', addNote);

socket.on('server:loadnotes', loadNotes);

const saveMessage = (mail, message, time) => {
    socket.emit('client:newmessage', {
      mail,
      message,
      time
    })
};

socket.on('server:newmessage', addMessage);

socket.on('server:loadmessages', loadMessage);