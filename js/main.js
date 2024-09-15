import {getData} from './api.js';
import {renderPhotoDescriptions} from './thumbnails/render-thumbnails.js';
import {configSoritng} from './thumbnails/sorting-thumbnails.js';
import {setupPopup} from './popup-picture.js';
import {appendDataError} from './util.js';
import {setSubmitForm} from './form/submit-form.js';

getData()
  .then((photos) => {
    renderPhotoDescriptions (photos);
    setupPopup (photos);
    configSoritng (photos);
  })
  .catch(
    () => appendDataError());

setSubmitForm();
