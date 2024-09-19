const COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

let comments = [];
let currentCount = 0;

socialComments.innerHTML = '';

const onCommentsLoaderButtonClick = () => {
  const newComments = comments.slice(currentCount, currentCount + COMMENTS_STEP);
  const length = currentCount + newComments.length;

  newComments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    socialComments.append(socialComment);
  });
  commentShownCount.textContent = length;
  commentTotalCount.textContent = comments.length;
  currentCount += COMMENTS_STEP;

  if (length >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
};

const generateComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  onCommentsLoaderButtonClick();
  commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
};

const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
};

export {clearComments, generateComments};
