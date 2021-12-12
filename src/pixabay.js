const API_KEY = '24778312-18f63a423fbed9787418fdc16';
const BASE_URL = 'https://pixabay.com/api/';
const searchParams = {
  q: 'yellow+flowers',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const url = `${BASE_URL}?key=${API_KEY}`;

fetch(url, searchParams).then(response => response.json());
