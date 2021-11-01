console.log("desde utils.js")

const notes = document.querySelector('#notes')
const title = document.getElementById("fill-title");
const chat = document.getElementById('id-chat');

let i = 0;

const addNote = note => {
  console.log("desde addNote")
  i++
  notes.innerHTML += `<tr>
                      <th scope="row">${i}</th>
                      <td>${note.title}</td>
                      <td>${note.description}</td>
                      <td><img src="${note.thumbnail}"></td>
                      </tr>
                      `
}

const loadNotes = (notes) => {
  notes.forEach((note) => addNote(note))
}

const addMessage = msg => {
  console.log("desde addMessage")
  chat.innerHTML += `<div>
                    <p style="display: inline; color: blue;"><b>${msg.mail},</b></p> 
                    <p style="display: inline; color: brown;">${msg.time}:</p>
                    <p style="display: inline; color: green;"><i>${msg.message}</i></p>
                    </div>
                    `
}

const loadMessage = (msgs) => {
  msgs.forEach((msg) => addMessage(msg))
}