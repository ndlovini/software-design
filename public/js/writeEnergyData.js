var database = firebase.database();

function writeUserData() {
  firebase.database().ref('energy').set({
    username: 'name',
    email: 'email',
    profile_picture : 'imageUrl'
  });
  window.alert("working!")
}

/*
function populateDatabase() {
	firebase.database.
}*/