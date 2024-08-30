import pets from './data/pets.json' with {type: 'json'};

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

    // Burger
    const menuToggle = document.getElementById('menu-toggle'); //checkbox
    const menuBtn = document.getElementById('menu-btn'); // menu-btn
    const mobileMenu = document.getElementById('mobile-menu'); // mobile menu
    const overlay = document.createElement('div'); // overlay
    overlay.className = 'overlay';
    
    document.body.appendChild(overlay);

    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
        menuToggle.checked = mobileMenu.classList.contains('open') ? false : true;
    });

    overlay.addEventListener('click', function () {
        menuBtn.classList.remove('open');
        menuToggle.checked = false;
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    mobileMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            menuBtn.classList.remove('open');
            menuToggle.checked = false;
            mobileMenu.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});