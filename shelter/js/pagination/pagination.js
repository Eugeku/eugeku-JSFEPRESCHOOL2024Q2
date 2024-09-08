import pets from '../data/pets.json' with {type: 'json'};
import { renderContent } from '../utils.js';
import { cardClick } from '../popup/popup.js';

// Pagination
const sliderContent = document.querySelector('.cards-container');
const right = document.querySelector('.button-paginator.right');
const left = document.querySelector('.button-paginator.left');
const fullRight = document.querySelector('.button-paginator.full-right');
const fullLeft = document.querySelector('.button-paginator.full-left');
const currentButton = document.querySelector('.button-paginator.current span');

let petsData = pets;
let slideArray = [];
let currentPage = 1;

function initPages() {
    slideArray = slideArray.length == 0 ? partitionAndSortPets([].concat(...Array(6).fill(petsData)), 8) : slideArray;
    currentPage = 1;
    renderSliderContent(slideArray);
    changeCurrentPageButton();
    changeButtonStatuses();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function partitionAndSortPets(array, chunkLength) {
    let shuffledArray = shuffle([...array]);
    let numChunks = array.length / chunkLength;
    let chunks = [];
    let isValidChunk = (chunk) => new Set(chunk).size === chunkLength;

    while (!(isChunksUnique(chunks.flat(), 3) && isChunksUnique(chunks.flat(), 6) && isChunksUnique(chunks.flat(), 8))) {
        chunks = [];
        shuffledArray = shuffle([...array]);

        while (chunks.length < numChunks) {
            let seenPets = new Set();
            let chunk = [];
            for (let i = 0; i < shuffledArray.length; i++) {
                let pet = shuffledArray[i];
                if (!seenPets.has(pet) && !chunk.includes(pet)) {
                    chunk.push(pet);
                    seenPets.add(pet);
                    shuffledArray.splice(i, 1);
                    i--;
                }
                if (chunk.length === chunkLength) break;
            }
            if (isValidChunk(chunk)) {
                chunks.push(chunk);
            } else {
                chunks = [];
                shuffledArray = shuffle([...array]);
            }
        }
    }
    return chunks.flat();
}

function isChunksUnique(arr, size) {
    let chunks = [];

    if (arr.length == 0) {
        return false;
    }

    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }

    let flag = chunks.every(chunk => {
        const set = new Set(chunk);
        return set.size === chunk.length;
    });

    return flag;
}

function renderSliderContent(cards) {
    let startSlide = (currentPage - 1) * getVisibleCardsCount();
    let finishSlide = startSlide + getVisibleCardsCount();

    let cardsHtml = cards.slice(startSlide, finishSlide).map(card => `
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

function onePageForward() {
    currentPage = currentPage + 1;
    changeButtonStatuses();
    changeCurrentPageButton();
    renderSliderContent(slideArray);
}

function fullForward() {
    currentPage = Math.floor(slideArray.length / getVisibleCardsCount());
    changeButtonStatuses();
    changeCurrentPageButton();
    renderSliderContent(slideArray);
}

function onePageBackward() {
    currentPage = currentPage - 1;
    changeButtonStatuses();
    changeCurrentPageButton();
    renderSliderContent(slideArray);
}

function fullBackward() {
    currentPage = 1;
    changeButtonStatuses();
    changeCurrentPageButton();
    renderSliderContent(slideArray);
}

function changeButtonStatuses() {
    if (currentPage == 1) {
        changeButtonStatus(left, false);
        changeButtonStatus(right, true);
        changeButtonStatus(fullLeft, false);
        changeButtonStatus(fullRight, true);
    }

    if (currentPage > 1 && currentPage < Math.floor(slideArray.length / getVisibleCardsCount())) {
        changeButtonStatus(left, true);
        changeButtonStatus(right, true);
        changeButtonStatus(fullLeft, true);
        changeButtonStatus(fullRight, true);
    }

    if (currentPage == Math.floor(slideArray.length / getVisibleCardsCount())) {
        changeButtonStatus(left, true);
        changeButtonStatus(right, false);
        changeButtonStatus(fullLeft, true);
        changeButtonStatus(fullRight, false);
    }
}

function changeCurrentPageButton() {
    currentButton.innerText = currentPage;
}


function changeButtonStatus(button, activeFlag) {
    button.className = button.className.replace(/(?:active|inactive)/, activeFlag ? "active" : "inactive");
    button.disabled = !activeFlag;
}

function getVisibleCardsCount() {
    let width = window.innerWidth;
    if (width >= 950) {
        return 8;
    } else if (width >= 600) {
        return 6;
    } else {
        return 3;
    }
}

export function pagination() {
    window.onload = initPages;
    window.addEventListener('resize', initPages);
    right.addEventListener('click', () => onePageForward());
    left.addEventListener('click', () => onePageBackward());
    fullRight.addEventListener('click', () => fullForward());
    fullLeft.addEventListener('click', () => fullBackward());
}