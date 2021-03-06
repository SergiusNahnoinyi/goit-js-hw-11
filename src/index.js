import './css/styles.css';
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

const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.button.addEventListener('click', onLoadMore);

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
    .getPhotos()
    .then(data => {
      if (data.totalHits === 0 || pixabayApiService.query === '') {
        loadMoreButton.hide();
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again',
        );
        return;
      }
      renderPhotoCardsMarkup(data);
      loadMoreButton.enable();
      Notiflix.Notify.success(`Hooray! We found ${data.total} images`);
    })
    .finally(() => refs.searchForm.reset());
}

function onLoadMore() {
  loadMoreButton.disable();
  pixabayApiService.getPhotos().then(data => {
    if (data.hits.length === 0) {
      loadMoreButton.hide();
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results");
      return;
    }
    renderPhotoCardsMarkup(data);
    smoothScroll();
    loadMoreButton.enable();
  });
}

function renderPhotoCardsMarkup(data) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', cardsTemplate(data.hits));
  const gallery = new SimpleLightbox('.gallery a', {
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250,
  });
  gallery.refresh();
}

function clearCardsContainer() {
  refs.cardsContainer.innerHTML = '';
}

function smoothScroll() {
  setTimeout(() => {
    const { height: cardHeight } = refs.cardsContainer.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 4,
      behavior: 'smooth',
    });
  }, 1000);
}
