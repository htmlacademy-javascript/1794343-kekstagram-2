const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotoDescriptions = (similarPhotoDescription) => {
  similarPhotoDescription.forEach(({id, url, description, likes, comments}) => {
    const photoDescriptionItem = pictureTemplate.cloneNode(true);
    photoDescriptionItem.dataset.pictureId = id;
    photoDescriptionItem.querySelector('.picture__img').src = url;
    photoDescriptionItem.querySelector('.picture__img').alt = description;
    photoDescriptionItem.querySelector('.picture__likes').textContent = likes;
    photoDescriptionItem.querySelector('.picture__comments').textContent = comments.length;
    picturesBlock.append(photoDescriptionItem);
  });
};

export {renderPhotoDescriptions};
