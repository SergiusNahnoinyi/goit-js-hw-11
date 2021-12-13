import Notiflix from 'notiflix';

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

  fetchPhotos() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=40`;

    return fetch(url, searchParams)
      .then(response => response.json())
      .then(data => {
        if (data.totalHits === 0) {
          loadMoreButton.disable();
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again',
          );
        }
        this.incrementPage();
        return data.hits;
      });
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
