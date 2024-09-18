const COMMENTS_LENGTH_MAX = 140;
const form = document.querySelector('.img-upload__form');
const textDescription = form.querySelector('.text__description');
const textHashtags = form.querySelector('.text__hashtags');

const Hashtag = {
  LENGTH_MIN: 2,
  LENGTH_MAX: 20,
  COUNT_MAX: 5
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

let errorMessage = '';

const validateComments = (value) => {
  if (value.length === 0) {
    return true;
  }
  return value.length <= COMMENTS_LENGTH_MAX;
};

pristine.addValidator(
  textDescription,
  validateComments,
  `не более ${COMMENTS_LENGTH_MAX} символов`
);

const error = () => errorMessage;

const validateHashtags = (value) => {
  errorMessage = '';

  const hashtags = value.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');

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
};

pristine.addValidator(
  textHashtags,
  validateHashtags,
  error
);

export {pristine};
