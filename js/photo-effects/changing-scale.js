import {Scale} from './data-for-effects';

const form = document.querySelector('.img-upload__form');
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('.img-upload__preview img');
const effectNone = form.querySelector('#effect-none');
let newScaleControlValue = Scale.DEFAULT;


const decreaseSize = () => {
  if (newScaleControlValue > Scale.MIN) {
    newScaleControlValue -= Scale.STEP;
    imgUploadPreview.style.transform = `scale(${newScaleControlValue / 100})`;
    scaleControlValue.value = `${newScaleControlValue}%`;
  }
};

scaleControlSmaller.addEventListener('click', (evt) => {
  evt.preventDefault();
  decreaseSize();
});

const increaseSize = () => {
  if (newScaleControlValue < Scale.MAX) {
    newScaleControlValue += Scale.STEP;
    imgUploadPreview.style.transform = `scale(${newScaleControlValue / 100})`;
    scaleControlValue.value = `${newScaleControlValue}%`;
  }
};

const clearScale = () => {
  scaleControlSmaller.disabled = false;
  scaleControlBigger.disabled = false;
  scaleControlValue.value = `${Scale.DEFAULT}%`;
  imgUploadPreview.style.transform = `scale(${Scale.DEFAULT / 100})`;
  effectNone.checked = true;
};

scaleControlBigger.addEventListener('click', (evt) => {
  evt.preventDefault();
  increaseSize();
});

export {clearScale};
