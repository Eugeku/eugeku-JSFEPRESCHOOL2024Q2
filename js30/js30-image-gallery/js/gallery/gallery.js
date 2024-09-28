const searchInput = document.querySelector('.search-input');
const imageGallery = document.querySelector('.image-gallery');
const clearButton = document.querySelector('.clear-button');
const searchButton = document.querySelector('.search-button');
const defaultQuery = 'winter';

async function fetchImages(query = "") {
  const API_KEY = 'KcAOwqHRK2och4ucHOpLc7Jb1_0Wk129Q4ObAn7kKII';
  const URL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}&per_page=15`;

  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`); // Если сервер вернул ошибку
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('API Error:', error);
    displayErrorMessage('Failed to fetch images. Please try again later.');
    return [];
  }
}

function displayImages(images) {
  imageGallery.innerHTML = '';

  if (images.length === 0) {
    imageGallery.innerHTML = '<p>No images found</p>';
    return;
  }

  images.forEach((image) => {
    const div = document.createElement("div");
    div.setAttribute('style', `background-image:url(${image.urls.small});`);
    div.classList.add('img')


    //     playerImage.setAttribute("style", `background-image:url(${song.img});`);
//     mainImage.setAttribute("style", `background-image:url(${song.img});`);

    // const img = document.createElement('img');
    // img.src = image.urls.small;
    // img.alt = image.alt_description || 'Image';
    imageGallery.appendChild(div);
  });
}

function displayErrorMessage(message) {
  imageGallery.innerHTML = `<p class='error-message'>${message}</p>`;
}

function search(e) {
  if (e.key === 'Enter') {
    const query = searchInput.value;
    fetchImages(query).then(displayImages);
  }
}

function clearAndReset() {
  searchInput.value = '';
  searchInput.placeholder = 'Search for images...';
}

export function gallery() {
    fetchImages(defaultQuery).then(displayImages);
    clearButton.addEventListener('click', () => clearAndReset());
    searchInput.addEventListener('keypress', (e) => search(e));
}