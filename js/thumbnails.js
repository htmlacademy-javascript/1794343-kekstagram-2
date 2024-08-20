import {similarPhotoDescription} from './data.js';
const picturesBlock = document.querySelector('.pictures');
const pictureFragment = document.querySelector('#picture').content.querySelector('.picture');

const photoDescriptions = similarPhotoDescription();
photoDescriptions.forEach(({url, description, likes, comments}) => {
  const photoDescriptionItem = pictureFragment.cloneNode(true);
  photoDescriptionItem.querySelector('.picture__img').src = url;
  photoDescriptionItem.querySelector('.picture__img').alt = description;
  photoDescriptionItem.querySelector('.picture__likes').textContent = likes;
  photoDescriptionItem.querySelector('.picture__comments').textContent = comments.length;
  picturesBlock.append(photoDescriptionItem);
});
