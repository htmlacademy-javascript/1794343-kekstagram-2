import {renderPhotoDescriptions} from './render-thumbnails';
import {debounce} from '../util';

const DEBOUNCE_DELAY = 500;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const RANDOM_PHOTOS_MAX_COUNT = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const imgFiltersBlock = document.querySelector('.img-filters');

let photos = [];
let currentFilter = Filters.DEFAULT;

const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('a.picture');
  thumbnails.forEach((photoElement) => photoElement.remove());
};

const debounceRender = debounce((data) => {
  clearThumbnails();
  renderPhotoDescriptions(data);
}, DEBOUNCE_DELAY);

const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');
  sortThumbnails();
};

function sortThumbnails () {
  let sortedPhotos = [];
  switch (currentFilter) {
    case Filters.DEFAULT:
      sortedPhotos = photos;
      break;
    case Filters.RANDOM:
      sortedPhotos = photos.toSorted(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTOS_MAX_COUNT);
      break;
    case Filters.DISCUSSED:
      sortedPhotos = photos.toSorted((a, b) => b.comments.length - a.comments.length);
  }

  debounceRender(sortedPhotos);
}

const configurateSoritng = (data) => {
  imgFiltersBlock.classList.remove('img-filters--inactive');
  imgFiltersBlock.addEventListener('click', (onFilterChange));
  photos = data;
};

export {configurateSoritng};
