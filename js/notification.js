import {isEscapeKey} from './util';

const body = document.body;

const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', closeNotification);
  }
};

const appendNotifiction = (template, trigger = null) => {
  trigger?.();
  const notificationBlock = template.cloneNode(true);
  body.append(notificationBlock);
  body.addEventListener('click', closeNotification);
  body.addEventListener('keydown', closeNotification);
};

export {appendNotifiction};
