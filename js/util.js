const errorTemplate = document.querySelector('#data-error').content;
const ALERT_SHOW_TIME = 5000;

const appendDataError = () => {
  const notificationNode = errorTemplate.cloneNode(true);
  document.body.append(notificationNode);

  const errorArea = document.body.querySelector('.data-error');
  setTimeout(() => {
    errorArea.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export{isEscapeKey, appendDataError};
