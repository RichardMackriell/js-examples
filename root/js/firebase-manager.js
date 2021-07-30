// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


$(document).ready(function() { 
    registerUsersListener();
});

function registerUsersListener() {
    let db = firebase.firestore();
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            let user = doc.data();
            $('#users-table').append(
                `<tr><td>${user.firstName}</td><td>${user.lastName}</td><td>${user.email}</td></tr>`
            );
        });
    });     
}
