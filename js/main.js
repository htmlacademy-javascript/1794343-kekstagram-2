import {setSubmitForm} from './form.js';
import {getData} from './api.js';
import {photoDescriptions} from './thumbnails/render-thumbnails.js';
import {setupPopup} from './popup-picture.js';
import {appendDataError} from './util.js';
import {configSoritng} from './thumbnails/sorting-thumbnails.js';
//const imgFilters = document.querySelector('.img-filters');
getData()
  .then((photos) => {
    photoDescriptions(photos);
    setupPopup (photos);
    configSoritng (photos);
  })
  .catch(
    () => appendDataError());

setSubmitForm();
