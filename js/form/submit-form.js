import {sendData} from '../api.js';
import {appendNotifiction} from '../notification.js';
import {closeForm} from './open-and-close.js';
import {pristine} from './validate-data.js';

const form = document.querySelector('.img-upload__form');
const submitButton = form.querySelector('.img-upload__submit');
const errorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;

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

export {setSubmitForm};
