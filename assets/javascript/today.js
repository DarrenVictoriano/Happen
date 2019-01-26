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
        weekNumbers: true,
        eventLimit: true, // allow "more" link when too many events
        events: 'https://fullcalendar.io/demo-events.json'
    });
});
// Nav bar mobile end
