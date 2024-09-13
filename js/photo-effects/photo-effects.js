import {SCALE, FILTERS_EFFECTS} from './data-for-effects';
//import './user-photo.js';

const form = document.querySelector('.img-upload__form');
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const imgUploadPreview = form.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = form.querySelector('.img-upload__effect-level');
const effectLevelValue = form.querySelector('.effect-level__value');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectsList = form.querySelector('.effects__list');
const effectsRadio = form.querySelectorAll('.effects__radio');
const effectNone = form.querySelector('#effect-none');

let newScaleControlValue = SCALE.DEFAULT;


//Scale changing

function decreaseSize () {
  if (newScaleControlValue > SCALE.MIN) {
    newScaleControlValue -= SCALE.STEP;
    imgUploadPreview.style.transform = `scale(${newScaleControlValue / 100})`;
    scaleControlValue.value = `${newScaleControlValue} %`;
  }
}

scaleControlSmaller.addEventListener('click', (evt) => {
  evt.preventDefault();
  decreaseSize();
});

function increaseSize () {
  if (newScaleControlValue < SCALE.MAX) {
    newScaleControlValue += SCALE.STEP;
    imgUploadPreview.style.transform = `scale(${newScaleControlValue / 100})`;
    scaleControlValue.value = `${newScaleControlValue} %`;
  }
}
const clearScale = function () {
  scaleControlSmaller.disabled = false;
  scaleControlBigger.disabled = false;
  scaleControlValue.value = `${SCALE.DEFAULT} %`;
  imgUploadPreview.style.transform = `scale(${SCALE.DEFAULT / 100})`;
  effectNone.checked = true;
};

scaleControlBigger.addEventListener('click', (evt) => {
  evt.preventDefault();
  increaseSize();
});

//effects

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
});

imgUploadEffectLevel.classList.add('hidden');

const clearFilter = function () {
  imgUploadEffectLevel.classList.add('hidden');
  imgUploadPreview.style.filter = 'none';
};

const applyEffect = function () {
  effectsRadio.forEach((effectRadio) => {
    const effectValue = effectRadio.value;
    const effectName = FILTERS_EFFECTS[effectValue];

    if (effectRadio.checked) {
      if (effectValue !== 'none') {
        imgUploadEffectLevel.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: effectName.minRange,
            max: effectName.maxRange,
          },
          start: effectName.startSlider,
          step: effectName.stepSlider,
        });
        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreview.style.filter = `${effectName.filter}(${effectLevelValue.value}${effectName.measure})`;
        });
      } else {
        clearFilter();
      }
    }
  });
};

effectsList.addEventListener('change', applyEffect);

export {clearFilter, clearScale};
