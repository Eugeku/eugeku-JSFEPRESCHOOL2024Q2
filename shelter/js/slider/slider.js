import pets from '../data/pets.json' with {type: 'json'};
import { renderContent } from '../utils.js';
import { cardClick } from '../popup/popup.js';

// Slider
const sliderContent = document.querySelector('.slider-content');
const petsData = pets;
let previousSlideCards = { direction: null, previousSlides: [] };
let currentSlideCards = [];

function getRandomCards(count, previousSlides) {
    let filteredCards = petsData.filter(card => !previousSlides.includes(card));
    let shuffledCards = filteredCards.sort(() => 0.5 - Math.random());
    return shuffledCards.slice(0, count);
}

function renderSliderContent(cards) {
    let cardsHtml = cards.map(card => `
            <div class="slide">
                <img class="slide-image" src="${card.img}" alt="${card.name}">
                <div class="pet-name">${card.name}</div>
                <button class="button-secondary">Learn more</button>
            </div>
    `).join('');
    renderContent(sliderContent, cardsHtml);
    addClickEventListeners();
}

function addClickEventListeners() {
    let slides = document.querySelectorAll('.slide');
    slides.forEach((slide) => {
        slide.addEventListener('click', () => cardClick(slide));
    });
}

function initSlider() {
    let visibleCards = getVisibleCardsCount();
    let initialCards = currentSlideCards.length == 0 ? getRandomCards(visibleCards, previousSlideCards.previousSlides) : currentSlideCards;
    currentSlideCards = initialCards;
    previousSlideCards.direction = previousSlideCards.direction;
    renderSliderContent(initialCards);
}

function slide(direction) {
    let visibleCards = getVisibleCardsCount();
    let newCards;

    do {
        newCards = getRandomCards(visibleCards, currentSlideCards);
    } while (newCards.length < visibleCards);

    if (previousSlideCards.direction == null) {
        previousSlideCards.previousSlides = currentSlideCards;
        previousSlideCards.direction = direction == 'next' ? 'prev' : 'next';
        currentSlideCards = newCards;
        animateSlide(currentSlideCards, direction);


    } else if (previousSlideCards.direction != direction) {
        previousSlideCards.previousSlides = currentSlideCards;
        previousSlideCards.direction = direction == 'next' ? 'prev' : 'next';
        currentSlideCards = newCards;
        animateSlide(currentSlideCards, direction);
    } else {
        previousSlideCards.direction = direction == 'next' ? 'prev' : 'next';
        [previousSlideCards.previousSlides, currentSlideCards] = [currentSlideCards, previousSlideCards.previousSlides];
        animateSlide(currentSlideCards, direction);
    }
}

function animateSlide(newCards, direction) {
    sliderContent.style.transition = 'transform 0.3s ease-in-out';

    if (direction == 'next') {
        sliderContent.style.transform = 'translateX(-100%)';
    } else {
        sliderContent.style.transform = 'translateX(100%)';
    }

    setTimeout(() => {
        renderSliderContent(newCards);
        sliderContent.style.transition = 'none';
        if (direction == 'next') {
            sliderContent.style.transform = 'translateX(100%)';
        } else {
            sliderContent.style.transform = 'translateX(-100%)';
        }
        sliderContent.style.transition = 'transform 0s';
    }, 300);

    setTimeout(() => {
        sliderContent.style.transition = 'none';
        sliderContent.style.transform = 'translateX(0)';
        sliderContent.style.transition = 'transform 0.3s';
    }, 350);
}

// Workaround for case if we initialized slider for resolution 320 and then resize to 1280
function getVisibleCardsCount() {
    let width = window.innerWidth;
    if (width >= 768) {
        return 3;
    } else if (width >= 320) {
        return 3;
    } else {
        return 3;
    }
}

export function slider() {
    window.onload = initSlider;
    window.addEventListener('resize', initSlider);
    document.querySelector('.slider-navigation-button.next').addEventListener('click', () => slide('next'));
    document.querySelector('.slider-navigation-button.prev').addEventListener('click', () => slide('prev'));
}