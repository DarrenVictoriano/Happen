var mainApp = {};
var uid = null;
var userFullName = null;
var theEvents = {};
var eventArr = [{
    end: moment().format(),
    start: moment().format(),
    title: "Welcome to Happen!",
    id: 0
}];

var eventsCalendar = [];
var firebase = app_firebase;
var db = database_firebase;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        uid = user.uid;
        userFullName = user.displayName;
        console.log(uid);
        console.log(user.displayName);

        // GET parameters to include
        var avatar = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + userFullName.split(" ").join("+");

        $(".profile-avatar").attr("src", avatar);

        db.ref(uid + "/events").on("value", function (snap) {
            console.log("this is the" + snap.val());

            $("#calendar-table").fullCalendar({
                timeZone: 'UTC',
                themeSystem: 'bootstrap4',
                defaultView: 'agendaDay',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listMonth'
                },
                bootstrapGlyphicons: {
                    prev: 'fa-chevron-left',
                    next: 'fa-chevron-right'
                },
                nowIndicator: true,
                weekNumbers: true,
                eventLimit: true, // allow "more" link when too many events
                events: snap.val()
            });

        }, function (err) {
            console.log(err);
        });

    } else {
        uid = null;
        window.location.replace("index.html");
        // No user is signed in.
    }
});

function logOut() {
    firebase.auth().signOut();
}

function createUserData() {
    var newUser = {
        name: userFullName,
        events: eventArr
    }
    db.ref().child(uid).set(newUser);
    console.log("created");
}

function addTask() {
    // value change firebase
    db.ref().once("value").then(function (snap) {
        if (!snap.val()[uid]) {
            console.log("user does not exist, creating new user");
            createUserData();
        }

        var timeStart = $('#time-start').val().trim();
        var timeEnd = $('#time-end').val().trim();
        var newTimeStart = moment().format("YYYY-MM-DDT" + timeStart + ":00-0000");
        var newTimeEnd = moment().format("YYYY-MM-DDT" + timeEnd + ":00-0000");

        eventArr = snap.val()[uid].events;
        eventArr.push({
            title: $('#task-title').val().trim(),
            start: newTimeStart,
            end: newTimeEnd,
            id: eventArr.length
        });

        theEvents = {
            events: eventArr
        }

        db.ref().child(uid).update(theEvents);
        eventsCalendar = snap.val()[uid].events;
        console.log(eventsCalendar);

    }, function (err) {
        console.log(err);
    });

    $('#calendar').fullCalendar('rerenderEvents');
    $('#calendar').fullCalendar('refetchEvents');
}

// Nav bar mobile activator


$(document).ready(function () {
    $('.sidenav').sidenav();


});

// Nav bar mobile end
$('.dropdown-trigger').dropdown();

$(".sign-out").on("click", logOut);

$("#task-adder").on("click", addTask);

$("#task-subtractor").on("click", test);