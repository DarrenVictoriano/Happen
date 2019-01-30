var mainApp = {};

(function () {
    var firebase = app_firebase;
    var uid = null;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            uid = user.uid;
        } else {
            uid = null;
            window.location.replace("index.html");
            // No user is signed in.
        }
    });

    function logOut() {
        firebase.auth().signOut();
    }

    mainApp.logOut = logOut;
})()

// Nav bar mobile activator
$(document).ready(function () {
    $('.sidenav').sidenav();

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
        events: 'https://fullcalendar.io/demo-events.json'
    });
});
// Nav bar mobile end
$('.dropdown-trigger').dropdown();

$("#sign-out").on("click", mainApp.logOut);

