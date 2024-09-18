import {Scale} from './data-for-effects';

const HUNDRED_PERCENT = 100;
const form = document.querySelector('.img-upload__form');
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('.img-upload__preview img');

let newScaleControlValue = Scale.DEFAULT;

const changePhoto = () => {
  imgUploadPreview.style.transform = `scale(${newScaleControlValue / HUNDRED_PERCENT})`;
  scaleControlValue.setAttribute('value', `${newScaleControlValue}%`);
};

const decreaseSize = () => {
  if (newScaleControlValue > Scale.MIN) {
    newScaleControlValue -= Scale.STEP;
    changePhoto();
  }
};

scaleControlSmaller.addEventListener('click', (evt) => {
  evt.preventDefault();
  decreaseSize();
});

const increaseSize = () => {
  if (newScaleControlValue < Scale.MAX) {
    newScaleControlValue += Scale.STEP;
    changePhoto();
  }
};

const clearScale = () => {
  newScaleControlValue = Scale.DEFAULT;
  changePhoto();
};

scaleControlBigger.addEventListener('click', (evt) => {
  evt.preventDefault();
  increaseSize();
});

export {clearScale};
