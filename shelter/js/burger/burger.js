import overlay from '../overlay/overlay.js';

// Burger
const menuToggle = document.getElementById('menu-toggle'); //checkbox
const menuBtn = document.getElementById('menu-btn'); // menu-btn
const mobileMenu = document.getElementById('mobile-menu'); // mobile menu

function burgerMenuClick() {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    overlay.toggle();
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'auto';
    menuToggle.checked = mobileMenu.classList.contains('open') ? false : true;
}

function overlayClick() {
    menuBtn.classList.remove('open');
    menuToggle.checked = false;
    mobileMenu.classList.remove('open');
    overlay.hide();
    document.body.style.overflow = 'auto';
}

function linkClick(e) {
    if (e.target.tagName === 'A') {
        menuBtn.classList.remove('open');
        menuToggle.checked = false;
        mobileMenu.classList.remove('open');
        overlay.hide();
        document.body.style.overflow = 'auto';
    }
}

export function burgerMenu() {
    menuBtn.addEventListener('click', () => burgerMenuClick());
    overlay.getOverlayElement().addEventListener('click', () => overlayClick());
    mobileMenu.addEventListener('click', (e) => linkClick(e));
}