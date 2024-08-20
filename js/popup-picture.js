import {isEscapeKey} from './util.js';
import {photoDescriptions} from './thumbnails.js';

const picturesBlock = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPicturelikescount = bigPicture.querySelector('.likes-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const bigPictureSocialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

picturesBlock.addEventListener('click', (evt) => {
  const currentPhoto = evt.target.closest('.picture');
  if (currentPhoto) {
    openPopup(currentPhoto.dataset.pictureId);
  }
});

function openPopup (pictureId) {
  bigPicture.classList.remove('hidden');
  const currentPhoto = photoDescriptions.find((photo) =>
    photo.id === Number(pictureId));

  bigPictureImg.src = currentPhoto.url;
  bigPicturelikescount.textContent = currentPhoto.likes;
  bigPictureSocialCaption.textContent = currentPhoto.description;
  bigPictureCommentShownCount.textContent = currentPhoto.comments.length;
  bigPictureCommentTotalCount.textContent = currentPhoto.comments.length;
  bigPictureSocialComments.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    bigPictureSocialComments.append(socialComment);
  });
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closePopup () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCancel.addEventListener('click', () => {
  closePopup();
});

