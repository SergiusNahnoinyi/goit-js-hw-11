import Notiflix from 'notiflix';

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

    return fetch(url, searchParams)
      .then(response => response.json())
      .then(data => {
        if (data.totalHits === 0) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again',
          );
        }
        return data.hits;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
