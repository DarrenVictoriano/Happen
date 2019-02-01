var app_firebase = {};
var database_firebase = null;

(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDKiKf-sb-bmvm-ocr7XrMTQXdVjXt_744",
        authDomain: "happen-f26da.firebaseapp.com",
        databaseURL: "https://happen-f26da.firebaseio.com",
        projectId: "happen-f26da",
        storageBucket: "happen-f26da.appspot.com",
        messagingSenderId: "344558691886"
    };
    firebase.initializeApp(config);

    app_firebase = firebase;
    database_firebase = firebase.database();
})()