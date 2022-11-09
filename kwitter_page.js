var firebaseConfig = {
    apiKey: "AIzaSyAIlmOCIYgqaSzeGDaHMJXk7bmYKkSQTBA",
    authDomain: "project-93-74f2c.firebaseapp.com",
    databaseURL: "https://project-93-74f2c-default-rtdb.firebaseio.com",
    projectId: "project-93-74f2c",
    storageBucket: "project-93-74f2c.appspot.com",
    messagingSenderId: "682272347273",
    appId: "1:682272347273:web:6fcb0694bcf90e833e2258"
  };  
  const app = initializeApp(firebaseConfig);

  firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  
    firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}
getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}
