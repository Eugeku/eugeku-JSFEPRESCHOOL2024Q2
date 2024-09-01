import pets from '../data/pets.json' with {type: 'json'};
import overlay from '../overlay/overlay.js';
import { renderContent } from '../utils.js';

// Popup
const popup = document.createElement('div'); // popup
popup.className = 'popup';
document.body.appendChild(popup);

export function cardClick(slide) {
    popup.style.display = 'flex';
    overlay.toggle();
    document.body.style.overflow = 'hidden';

    let petName = slide.querySelector('.pet-name').textContent;
    let pet = findPetByName(pets, petName);
    let popupModal = `
        <div class="popup-modal">
            <img class="popup-image" src="${pet.img}" alt="${pet.name}">
            <div class="popup-text-content">
                <h3 class="popup-pet-name">${pet.name}</h3>
                <h4 class="popup-breed">${pet.type} - ${pet.breed}</h4>
                <p class="popup-description">${pet.description}</p>
                <ul class="popup-list">
                    <li class="popup-list-age"><span class="popup-item-title">Age:</span><span> ${pet.age}</span></li>
                    <li class="popup-list-inoculations"><span class="popup-item-title">Inoculations:</span><span> ${pet.inoculations.join(', ')}</span></li>
                    <li class="popup-list-diseases"><span class="popup-item-title">Diseases:</span><span> ${pet.diseases.join(', ')}</span></li>
                    <li class="popup-list-parasites"><span class="popup-item-title">Parasites:</span><span> ${pet.parasites.join(', ')}</span></li>
                </ul>
            </div>
            <button class="popup-button-close"></button>
        </div>
    `;
    renderContent(popup, popupModal);
    const close = document.getElementsByClassName('popup-button-close')[0];
    close.addEventListener('click', () => closeCard());
    overlay.getOverlayElement().addEventListener('click', () => closeCard());
}

function closeCard() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    overlay.hide();
}


function findPetByName(pets, name) {
    return pets.filter(pet => pet.name.toLowerCase() == name.toLowerCase())[0];
}