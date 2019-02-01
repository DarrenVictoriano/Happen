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

//ADDER ICON
$('#task-adder').on('click', function () {
    event.preventDefault();
    
    var taskInfo = {};
    var taskTitle = $('#task-title').val().trim();
    var timeStart = $('#time-start').val().trim();
    var timeEnd = $('#time-end').val().trim();
    var timeFormater = moment().format("YYYY-MM-DDT|HH:mm");
    var futureTime;
    var futureUnixStart = timeChanger(timeFormater, timeStart);
    var futureUnixEnd = timeChanger(timeFormater, timeEnd);

    //START AND END ADJUSTORS
    function timeChanger(x, y) {
        x = x.split('|');
        var currentDate = x[0];
        var importedTime = y;
        futureTime = currentDate + importedTime + ":00-0000";
        return futureTime;
    }
    //END OF: START AND END ADJUSTORS

    //VALID OR NOT
    function isEndAfterStart(start, end) {
        var format = "HH:mm";
        return moment(end, format) > moment(start, format);
    }
    function isValid() {
        if (isEndAfterStart(timeStart, timeEnd)) {
            taskInfo = {
                title: taskTitle,
                start: futureUnixStart,
                end: futureUnixEnd,
            };
            todayTasks.push(taskInfo);
            console.log(taskInfo);
        } else {
            return;
        }
    }
    //END OF: VALID OR NOT

    isValid();
});
//END OF: ADDER ICON

//SUBTRACTOR ICON
$('#task-subtractor').on('click', function () {
    todayTasks.pop();
    console.log(todayTasks.length);
});
//END OF: SUBTRACTOR ICON



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

