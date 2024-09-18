const ALERT_SHOW_TIME = 5000;
const errorTemplate = document.querySelector('#data-error').content;

const appendDataError = (errorMessage) => {
  const notificationBlock = errorTemplate.cloneNode(true);
  if (errorMessage) {
    notificationBlock.querySelector('.data-error__title').textContent = errorMessage;
  }
  document.body.append(notificationBlock);

  const errorArea = document.body.querySelector('.data-error');
  setTimeout(() => {
    errorArea.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey, appendDataError, debounce};
