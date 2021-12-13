import './css/styles.css';
const axios = require('axios');
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayApiService from './pixabay';
import cardsTemplate from './templates/photo-card.hbs';
import LoadMoreButton from './load-more-button';

const refs = {
  searchForm: document.querySelector('.search-form'),
  cardsContainer: document.querySelector('.gallery'),
};

const loadMoreButton = new LoadMoreButton({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.button.addEventListener('click', fetchPhotos);

const pixabayApiService = new PixabayApiService();

function onSearch(event) {
  event.preventDefault();
  pixabayApiService.query = event.currentTarget.elements.searchQuery.value;

  if (pixabayApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again',
    );
  }
  loadMoreButton.show();
  pixabayApiService.resetPage();
  clearCardsContainer();
  fetchPhotos();
}

function fetchPhotos() {
  loadMoreButton.disable();
  pixabayApiService
    .fetchPhotos()
    .then(hits => {
      renderPhotoCardsMarkup(hits);
      loadMoreButton.enable();
    })
    .finally(() => refs.searchForm.reset());
}

function renderPhotoCardsMarkup(hits) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', cardsTemplate(hits));
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}
