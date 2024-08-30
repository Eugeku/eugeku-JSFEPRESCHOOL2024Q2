import pets from './data/pets.json' with {type: 'json'};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Links
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


    // Slider
    const sliderContent = document.querySelector('.slider-content');
    const petsData = pets;
    let previousSlideCards = { direction: null, previousSlides: [] };
    let currentSlideCards = [];

    function getRandomCards(count, previousSlides) {
        const filteredCards = petsData.filter(card => !previousSlides.includes(card));
        const shuffledCards = filteredCards.sort(() => 0.5 - Math.random());
        return shuffledCards.slice(0, count);
    }

    function renderSliderContent(cards) {
        sliderContent.innerHTML = cards.map(card => `
            <div class="slide">
                <img class="slide-image" src="${card.img}" alt="${card.name}">
                <div class="pet-name">${card.name}</div>
                <button class="button-secondary">Learn more</button>
            </div>
    `).join('');
    }

    function initSlider() {
        const visibleCards = getVisibleCardsCount();
        const initialCards = currentSlideCards.length == 0 ? getRandomCards(visibleCards, previousSlideCards.previousSlides) : currentSlideCards;
        currentSlideCards = initialCards;
        previousSlideCards.direction = previousSlideCards.direction;
        renderSliderContent(initialCards);
    }

    function slide(direction) {
        const visibleCards = getVisibleCardsCount();
        let newCards;
    
        do {
            newCards = getRandomCards(visibleCards, currentSlideCards);
        } while (newCards.length < visibleCards);
    
        if (previousSlideCards.direction == null) {
            previousSlideCards.previousSlides = currentSlideCards;
            previousSlideCards.direction = direction === 'next' ? 'prev' : 'next';
            currentSlideCards = newCards;
            animateSlide(currentSlideCards, direction);
        } else if (previousSlideCards.direction === direction) {
            previousSlideCards.previousSlides = currentSlideCards;
            previousSlideCards.direction = direction === 'next' ? 'prev' : 'next';
            currentSlideCards = newCards;
            animateSlide(currentSlideCards, direction);
        } else {
            previousSlideCards.direction = direction === 'next' ? 'prev' : 'next';
            [previousSlideCards.previousSlides, currentSlideCards] = [currentSlideCards, previousSlideCards.previousSlides];
            animateSlide(currentSlideCards, direction);
        }
    }

    function slideToNext() {
        slide('next');
    }
    
    function slideToPrev() {
        slide('prev');
    }

    function animateSlide(newCards, direction) {
        sliderContent.style.transition = 'transform 0.3s ease-in-out';

        if (direction === 'next') {
            sliderContent.style.transform = 'translateX(-100%)';
        } else {
            sliderContent.style.transform = 'translateX(100%)';
        }

        setTimeout(() => {
            renderSliderContent(newCards);
            sliderContent.style.transition = 'none';
            if (direction === 'next') {
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
        const width = window.innerWidth;
        if (width >= 768) {
            return 3;
        } else if (width >= 320) {
            return 3;
        } else {
            return 3;
        }
    }

    window.onload = initSlider;
    document.querySelector('.slider-navigation-button.next').addEventListener('click', slideToNext);
    document.querySelector('.slider-navigation-button.prev').addEventListener('click', slideToPrev);
    window.addEventListener('resize', initSlider);
});