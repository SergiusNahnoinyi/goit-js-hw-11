import './css/styles.css';
const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayApiService from './pixabay';

const refs = {
  searchForm: document.querySelector('.search-form'),
};

refs.searchForm.addEventListener('submit', onSearch);

const pixabayApiService = new PixabayApiService();

function onSearch(event) {
  event.preventDefault();
  pixabayApiService.query = event.currentTarget.elements.searchQuery.value;

  if (pixabayApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again',
    );
  }

  pixabayApiService.fetchPhotos();
}
