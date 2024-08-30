import {isEscapeKey} from './util.js';
import {photoDescriptions} from './thumbnails.js';
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

picturesBlock.addEventListener('click', (evt) => {
  const currentPhoto = evt.target.closest('.picture');
  if (currentPhoto) {
    evt.preventDefault();
    openPopup(currentPhoto.dataset.pictureId);
  }
});

function openPopup (pictureId) {
  const currentPhoto = photoDescriptions.find((photo) =>
    photo.id === Number(pictureId));

  bigPictureImg.src = currentPhoto.url;
  bigPictureSocialCaption.textContent = currentPhoto.description;
  bigPicturelikescount.textContent = currentPhoto.likes;
  generateComments(currentPhoto.comments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  if (currentPhoto.comments.length === 0) {
    bigPicture.querySelector('.social__comment-count').innerHTML = 'Комментариев нет...';
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  }
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

export {openPopup};
