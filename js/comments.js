let comments = [];
const COMMENTS_STEP = 5;
let currentCount = 0;

const bigPicture = document.querySelector('.big-picture');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');

socialComments.innerHTML = '';

function generateNextComments () {
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
    commentsLoader.classList.add('hidden');
  }
}

function clearComments () {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', generateNextComments);
}

function generateComments (currentPhotoComments) {
  comments = currentPhotoComments;
  generateNextComments();
  commentsLoader.addEventListener('click', generateNextComments);
}

export {clearComments, generateComments};
