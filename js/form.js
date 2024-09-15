import {isEscapeKey, appendDataError} from './util.js';
import {clearFilter, clearScale} from './photo-effects/photo-effects.js';
import {sendData} from './api.js';
import {appendNotifiction} from './notification.js';

const form = document.querySelector('.img-upload__form');
const imgUploadInput = form.querySelector('.img-upload__input');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');
const textDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

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

// подстановка фото файла

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.gfif'];

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

// Валидация
const COMMENTS_LENGTH_MAX = 140;
const Hashtag = {
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
      check: hashtags.length > Hashtag.COUNT_MAX,
      error: `не более ${Hashtag.COUNT_MAX} хэштегов`
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
      check: hashtags.some((hashtag) => hashtag.length > Hashtag.LENGTH_MAX || hashtag.length < Hashtag.LENGTH_MIN),
      error: `должен быть от ${Hashtag.LENGTH_MIN} до ${Hashtag.LENGTH_MAX} символов, включая #`
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

//Отправка формы

const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setSubmitForm = () => {
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(form))
      .then(
        () => appendNotifiction(successTemplate, () => closeForm())
      )
      .catch(
        () => appendNotifiction(errorTemplate)
      )
      .finally(unblockSubmitButton);
  }
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  setSubmitForm();
});

export {setSubmitForm, closeForm};
