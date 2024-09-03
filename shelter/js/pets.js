import { pagination } from './pagination/pagination.js';

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Links
    document.getElementById("header-logo-main").addEventListener("click", function () {
        document.location.href = './main.html';
    });

    pagination();
});