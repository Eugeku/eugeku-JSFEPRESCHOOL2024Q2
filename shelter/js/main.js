document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("header-logo-main").addEventListener("click", function () {
        document.location.href = '#';
    });

    document.getElementById("make-friend-button").addEventListener("click", function () {
        document.location.href = '#pets-main';
    });

    document.getElementById("get-to-know-rest-button").addEventListener("click", function () {
        document.location.href = './pets.html';
    });

    document.getElementById("credit-card").addEventListener("click", function () {
        document.location.href = '#';
    });
});