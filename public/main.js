      //Productos
      const form = document.getElementById('id-form')
      const titulo = document.getElementById('inputtitulo');
      const precio = document.getElementById('inputprecio');
      const thumbnail = document.getElementById('inputthumbnail');
      
      form.addEventListener('submit', e =>{
          // e.preventDefault(); Elimino el preventDefault para poder enviar el formulario, sino me frena el POST del form
          saveNote(titulo.value, precio.value, thumbnail.value) // tambien funciona con .target.value
      });

      //Chat
      const formchat = document.getElementById('id-form-chat');
      const mail = document.getElementById('id-mail');
      const message = document.getElementById('id-chat-message');

      formchat.addEventListener('submit', e =>{
        // e.preventDefault();
        let time = new Date().toUTCString();
        time = time.split(' ').slice(0, 5).join(' ');
        console.log("desde el boton enviar mensajes");
        saveMessage(mail.value, message.value, time);
      })

        
