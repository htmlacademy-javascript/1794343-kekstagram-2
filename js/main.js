import {setSubmitForm} from './form.js';
import {getData} from './api.js';
import {photoDescriptions} from './thumbnails.js';
import {openPopup} from './popup-picture.js';
import {appendDataError} from './util.js';

getData()
  .then((photos) => {
    photoDescriptions(photos);
    openPopup (photos);
  })
  .catch(appendDataError);

setSubmitForm();
