import {isEscapeKey} from './util.js';
import {clearFilter, clearScale} from './photo-effects/photo-effects.js';

const form = document.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');
const textDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');


//Открытие и закрытие

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

function openForm () {

  imgUploadOverlay.classList.remove('hidden');

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

imgUploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openForm();
});

function closeForm () {
  imgUploadInput.value = '';
  textDescription.value = '';
  textHashtags.value = '';
  imgUploadOverlay.classList.add('hidden');
  clearScale();
  clearFilter();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgUploadCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});

// Валидация
const COMMENTS_LENGTH_MAX = 140;
const HASHTAG = {
  LENGTH_MIN: 2,
  LENGTH_MAX: 20,
  COUNT_MAX: 5
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

function validateComments (value) {
  if (value.length === 0) {
    return true;
  }
  return value.length <= COMMENTS_LENGTH_MAX;
}

pristine.addValidator(
  textDescription,
  validateComments,
  `не более ${COMMENTS_LENGTH_MAX} символов`
);

let errorMessage = '';
const error = () => errorMessage;

function validateHashtags (value) {
  errorMessage = '';

  const hashtags = value.toLowerCase().trim().split(' ');

  if (value.length === 0) {
    return true;
  }

  const patterns = [
    {
      check: hashtags.some((hashtag) => hashtag.slice(1).includes('#')),
      error: 'хэштеги разделяются пробелами'
    },
    {
      check: hashtags.length > HASHTAG.COUNT_MAX,
      error: `не более ${HASHTAG.COUNT_MAX} хэштегов`
    },
    {
      check: hashtags.some((hashtag, i) => hashtags.includes(hashtag, i + 1)),
      error: 'хэштег не может повторяться'
    },
    {
      check: hashtags.some((hashtag) => !/^#/.test(hashtag)),
      error: 'должен начинаться с #'
    },
    {
      check: hashtags.some((hashtag) => hashtag.length > HASHTAG.LENGTH_MAX || hashtag.length < HASHTAG.LENGTH_MIN),
      error: `должен быть от ${HASHTAG.LENGTH_MIN} до ${HASHTAG.LENGTH_MAX} символов, включая #`
    },
    {
      check: hashtags.some((hashtag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)),
      error: 'должен состоять только из букв и цифр'
    },

  ];
  return patterns.every((pattern) => {
    const isInvalid = pattern.check;
    if (isInvalid) {
      errorMessage = pattern.error;
    }
    return !isInvalid;
  });
}

pristine.addValidator(
  textHashtags,
  validateHashtags,
  error
);

const submitForm = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    textHashtags.value = textHashtags.value.trim();
    form.submit();
  }
};

form.addEventListener('submit', submitForm);
