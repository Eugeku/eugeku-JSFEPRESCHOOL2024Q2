import { burgerMenu } from './burger/burger.js';

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Links
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

    burgerMenu();
});