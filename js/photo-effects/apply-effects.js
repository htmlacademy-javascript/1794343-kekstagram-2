import {filterEffects} from './data-for-effects';

const form = document.querySelector('.img-upload__form');
const imgUploadPreview = form.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = form.querySelector('.img-upload__effect-level');
const effectLevelValue = form.querySelector('.effect-level__value');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectsList = form.querySelector('.effects__list');
const effectsRadio = form.querySelectorAll('.effects__radio');
const effectNone = form.querySelector('#effect-none');

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

const clearFilter = () => {
  imgUploadEffectLevel.classList.add('hidden');
  imgUploadPreview.style.filter = 'none';
  effectNone.checked = true;
};

const onEffectsChange = () => {
  effectsRadio.forEach((effectRadio) => {
    const effectValue = effectRadio.value;
    const effectName = filterEffects[effectValue];

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

effectsList.addEventListener('change', onEffectsChange);

export {clearFilter};
