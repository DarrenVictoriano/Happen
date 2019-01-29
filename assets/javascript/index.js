// typed.js initializer
var typed = new Typed("#typed-movement", {
    strings: ["changes", "decisions", "progress", "it"],
    backSpeed: 50,
    typeSpeed: 50
});
// typed.js initializer end

// Modals
$("#login").on("click", function () {
    $("#login-modal").modal();
});
$("#signup").on("click", function () {
    $("#signup-modal").modal();
});

// https://www.youtube.com/watch?v=iKlWaUszxB4