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

    var todayTasks = [];

    //activates when plus button is clicked
    $('#task-adder').on('click', function () {

        event.preventDefault();
        var taskInfo = {};

        //this records the value of our inputs for Task, Start time, and End time
        var taskTitle = $('#task-title').val().trim();
        var timeStart = $('#time-start').val().trim();
        var timeEnd = $('#time-end').val().trim();

        function isEndAfterStart(start, end) {
            var format = "HH:mm";
            return moment(end, format) > moment(start, format);
            //this returns either a true or false value
        }

        isEndAfterStart(timeStart, timeEnd);

        //If is valid it will append these values to the object taskInfo, if not it will say you need to fix it. 
        function isValid() {
            if (isEndAfterStart(timeStart, timeEnd) == true) {
                // Our variables/bindings are added into the object
                taskInfo = {
                    title: taskTitle,
                    start: timeStart,
                    end: timeEnd,
                };
                console.log(taskInfo);
                for (var i = 0; i < todayTasks.length; i ++)
                todayTasks.push(taskInfo);

                console.log(todayTasks);

            } else {
                return;
            }
        }
        isValid();
    });

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

