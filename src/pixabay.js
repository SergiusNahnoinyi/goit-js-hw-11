const axios = require('axios');
const API_KEY = '24778312-18f63a423fbed9787418fdc16';
const BASE_URL = 'https://pixabay.com/api/';
const searchParams = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
};
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getPhotos() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=40`;

    const response = await axios.get(url, searchParams);
    const data = response.data;

    this.incrementPage();
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
