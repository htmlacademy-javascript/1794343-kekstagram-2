import {isEscapeKey, appendDataError} from '../util.js';
import {clearFilter} from '../photo-effects/apply-effects.js';
import {clearScale} from '../photo-effects/changing-scale.js';
import {pristine} from './validate-data.js';

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.gfif'];

const form = document.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const textDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === textDescription || document.activeElement === textHashtags) {
      evt.stopPropagation();
    } else {
      closeForm();
    }
  }
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Подстановка фото файла

imgUploadInput.addEventListener('change', () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  } else {
    appendDataError('Неверный формат файла, используйте jpg, jpeg, png, gif, gfif');
  }
  openForm();
});

function closeForm () {
  imgUploadOverlay.classList.add('hidden');
  imgUploadInput.value = '';
  textDescription.value = '';
  textHashtags.value = '';
  clearScale();
  clearFilter();
  pristine.reset();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});

export {closeForm};
