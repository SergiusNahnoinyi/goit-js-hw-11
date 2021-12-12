const API_KEY = '24778312-18f63a423fbed9787418fdc16';
const BASE_URL = 'https://pixabay.com/api/';
const searchParams = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchPhotos() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}`;

    fetch(url, searchParams).then(response => response.json());
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
