var mainApp = {};
var uid = null;
var userFullName = null;

(function () {
    var firebase = app_firebase;

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

// profile avatar
//url: "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=DV"


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

$(".sign-out").on("click", mainApp.logOut);

