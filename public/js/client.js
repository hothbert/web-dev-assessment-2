//required for front end communication between client and server

const socket = io();

const inboxPeople = document.querySelector(".inbox__people");


let userName = "";
let id;
const newUserConnected = function (data) {
    

    //give the user a random unique id
    id = Math.floor(Math.random() * 1000000);
    userName = 'user-' +id;
    //console.log(typeof(userName));   
    

    //emit an event with the user id
    socket.emit("new user", userName);
    //call
    addToUsersBox(userName);
};

const addToUsersBox = function (userName) {
    //This if statement checks whether an element of the user-userlist
    //exists and then inverts the result of the expression in the condition
    //to true, while also casting from an object to boolean
    if (!!document.querySelector(`.${userName}-userlist`)) {
        return;
    
    }
    
    //setup the divs for displaying the connected users
    //id is set to a string including the username
    const userBox = `
    <div class="chat_id ${userName}-userlist">
      <h5>${userName}</h5>
    </div>
  `;
    //set the inboxPeople div with the value of userbox
    inboxPeople.innerHTML += userBox;
};

//call 
newUserConnected();

//when a new user event is detected
socket.on("new user", function (data) {
  data.map(function (user) {
          if(!!document.querySelector(`.${user}-userlist`)){
            console.log("a")
            return
          } //checks user is in the list
          addNewMessage( {user : "", message: ((user + " has connected to the chat")).bold()}); //displays message about user joining
          
          addToUsersBox(user);
      });
  
  
});

//when a user leaves
socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();

  addNewMessage( {user : "", message: ((userName + " has left the chat")).bold()}); //displays message about user leaving
});


const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");
const fallback = document.querySelector(".fallback");

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message">
    <div class="received__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author">${user}</span>
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  const myMsg = `
  <div class="outgoing__message">
    <div class="sent__message">
      <p>${message}</p>
      <div class="message__info">
        <span class="time_date">${formattedTime}</span>
      </div>
    </div>
  </div>`;

  //is the message sent or received
  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  }

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });

  inputField.value = "";
});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});

//displays message if the user is typing
//checks if there is multiple characters in the input box
inputField.addEventListener("keyup", () => {
  socket.emit("type", {
    typingTrue: inputField.value.length > 0,
    nick: userName,
  })
})

//checks for input
messageForm.addEventListener("input", (e) => {
  e.preventDefault();

  socket.emit("type", {
    user: userName
  })
})

//displays message if the user is typing only if the input box is empty
socket.on("type", function (data) {
  const { typingTrue, nick } = data;

  if (!typingTrue) {
    fallback.innerHTML = "";
    return;
  }

  fallback.innerHTML = `<p>${nick} is typing..</p>`;

});