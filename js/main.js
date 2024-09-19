import {getData} from './api.js';
import {renderPhotoDescriptions} from './thumbnails/render-thumbnails.js';
import {configurateSoritng} from './thumbnails/sorting-thumbnails.js';
import {onThumbnailClick} from './popup-picture.js';
import {appendDataError} from './util.js';
import {onSubmitButtonClick} from './form/submit-form.js';

getData()
  .then((photos) => {
    renderPhotoDescriptions (photos);
    onThumbnailClick (photos);
    configurateSoritng (photos);
  })
  .catch(
    () => appendDataError());

onSubmitButtonClick();
