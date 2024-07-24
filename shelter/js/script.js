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

    document.getElementById("mail-to").addEventListener("click", function () {
        document.location.href = 'mailto:email@shelter.com';
    });

    document.getElementById("phone-to").addEventListener("click", function () {
        document.location.href = 'tel:+136745677554';
    });

    document.getElementById("adress1").addEventListener("click", function () {
        window.open('https://www.google.com/maps/search/1+Central+St/@42.3583317,-71.0563401,18.2z?entry=ttu');
    });

    document.getElementById("adress2").addEventListener("click", function () {
        window.open('https://www.google.com/maps/search/18+South+Park,+London/@51.4206765,-0.1999813,17.93z?entry=ttu');
    });
});