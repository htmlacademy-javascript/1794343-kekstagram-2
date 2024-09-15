import {debounce} from '../util';
import {photoDescriptions} from './render-thumbnails';

const imgFilters = document.querySelector('.img-filters');
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

const RANDOM_PHOTOS_COUNT = 10;

const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('a.picture');
  thumbnails.forEach((photoElement) => photoElement.remove());
};
const debounceRender = debounce((data) => {
  clearThumbnails();
  photoDescriptions(data);
}, 500);

function onFilterChange (evt) {
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
}

function sortingThumbnails () {
  let sortedPhotos = [];

  if (currentFilter === Filters.DEFAULT) {
    sortedPhotos = photos;
  }
  if (currentFilter === Filters.RANDOM) {
    sortedPhotos = photos.toSorted(SortingFuncs.RANDOM).slice(1, RANDOM_PHOTOS_COUNT);
  }
  if (currentFilter === Filters.DISCUSSED) {
    sortedPhotos = photos.toSorted(SortingFuncs.DISCUSSED);
  }
  debounceRender(sortedPhotos);
}

function configSoritng (data) {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', (onFilterChange));
  photos = data;
}

export {configSoritng};
