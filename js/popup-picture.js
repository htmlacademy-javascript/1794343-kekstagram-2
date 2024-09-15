import {isEscapeKey} from './util.js';
import {clearComments, generateComments} from './comments.js';

const picturesBlock = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPicturelikescount = bigPicture.querySelector('.likes-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const setupPopup = (data) => {
  picturesBlock.addEventListener('click', (evt) => {
    const currentElement = evt.target.closest('.picture');
    if (currentElement) {
      const currentId = currentElement.dataset.pictureId;
      const currentPhoto = data.find((photo) =>
        photo.id === Number(currentId));
      evt.preventDefault();
      openPopup(currentPhoto);
    }
  });
};

function openPopup (currentPhoto) {
  bigPictureImg.src = currentPhoto.url;
  bigPictureSocialCaption.textContent = currentPhoto.description;
  bigPicturelikescount.textContent = currentPhoto.likes;
  generateComments(currentPhoto.comments);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePopup () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

export {setupPopup};
