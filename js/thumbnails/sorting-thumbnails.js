import {renderPhotoDescriptions} from './render-thumbnails';
import {debounce} from '../util';

const imgFiltersBlock = document.querySelector('.img-filters');

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

let photos = [];
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
let currentFilter = Filters.DEFAULT;

const SortingFuncs = {
  RANDOM: () => 0.5 - Math.random(),
  DISCUSSED: (a, b) => b.comments.length - a.comments.length
};

const RANDOM_PHOTOS_MAX_COUNT = 10;

const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('a.picture');
  thumbnails.forEach((photoElement) => photoElement.remove());
};

const debounceRender = debounce((data) => {
  clearThumbnails();
  renderPhotoDescriptions(data);
}, 500);

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
  sortingThumbnails();
};

function sortingThumbnails () {
  let sortedPhotos = [];
  switch (currentFilter) {
    case Filters.DEFAULT:
      sortedPhotos = photos;
      break;
    case Filters.RANDOM:
      sortedPhotos = photos.toSorted(SortingFuncs.RANDOM).slice(0, RANDOM_PHOTOS_MAX_COUNT);
      break;
    case Filters.DISCUSSED:
      sortedPhotos = photos.toSorted(SortingFuncs.DISCUSSED);
  }

  debounceRender(sortedPhotos);
}

const configSoritng = (data) => {
  imgFiltersBlock.classList.remove('img-filters--inactive');
  imgFiltersBlock.addEventListener('click', (onFilterChange));
  photos = data;
};

export {configSoritng};
