const searchInput = document.querySelector('.search-input');
const imageGallery = document.querySelector('.image-gallery');
const errorHandler = document.querySelector('.error-handler');
const clearButton = document.querySelector('.clear-button');
const searchButton = document.querySelector('.search-button');
const countSelect = document.querySelector('.count-select');
const defaultQuery = 'winter';
const defaultcount = 15;

async function fetchImages(query = "") {
  const perPage = countSelect.value ? countSelect.value : defaultcount;
  const apiKey = 'KcAOwqHRK2och4ucHOpLc7Jb1_0Wk129Q4ObAn7kKII';
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('API Error:', error);
    displayErrorMessage('!!!Failed to fetch images. Please try again later within 1 hour. You might exceeded you requests per hour 0/50 or there is an a error on api side!!!');
    return [];
  }
}

function displayImages(images) {
  imageGallery.innerHTML = '';
  if (images.length === 0) {
    imageGallery.innerHTML += '<p>No images found</p>';
    return;
  }
  images.forEach((image) => {
    const div = document.createElement("div");
    div.setAttribute('style', `background-image:url(${image.urls.small});`);
    div.classList.add('img')
    div.addEventListener('click', () => openImage(image.urls.small));
    imageGallery.appendChild(div);
  });
}

function openImage(url) {
  window.open(url, '_blank');
}

function displayErrorMessage(message) {
  errorHandler.innerHTML = `<p class='error-message'>${message}</p>`;
}

function searchByKeyButton(e) {
  if (e.key === 'Enter') {
    search();
  }
}

function search() {
  const query = searchInput.value === '' ? defaultQuery : searchInput.value;
  fetchImages(query).then(displayImages);
}

function clearAndReset() {
  searchInput.value = '';
  searchInput.placeholder = 'Search for images...';
}

export function gallery() {
  clearAndReset();
  fetchImages(defaultQuery).then(displayImages);
  clearButton.addEventListener('click', () => clearAndReset());
  searchInput.addEventListener('keypress', (e) => searchByKeyButton(e));
  searchButton.addEventListener('click', () => search());
}