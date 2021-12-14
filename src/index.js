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
  searchButton: document.querySelector('[type="submit"]'),
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

  loadMoreButton.show();
  pixabayApiService.resetPage();
  clearCardsContainer();
  fetchPhotos();
}

function fetchPhotos() {
  loadMoreButton.disable();
  pixabayApiService
    .fetchPhotos()
    .then(data => {
      if (data.totalHits === 0 || pixabayApiService.query === '') {
        loadMoreButton.hide();
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again',
        );
        return;
      } else if (data.hits.length === 0) {
        loadMoreButton.hide();
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results");
        return;
      }
      renderPhotoCardsMarkup(data);
      loadMoreButton.enable();
    })
    .finally(() => refs.searchForm.reset());
}

function renderPhotoCardsMarkup(data) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', cardsTemplate(data.hits));
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}
