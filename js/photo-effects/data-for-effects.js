const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

const FILTERS_EFFECTS = {
  none: {
    filter: 'none',
  },
  chrome: {
    filter:'grayscale',
    measure: '',
    minRange: 0,
    maxRange: 1,
    startSlider: 1,
    stepSlider: 0.1,
  },
  sepia: {
    filter:'sepia',
    measure: '',
    minRange: 0,
    maxRange: 1,
    startSlider: 1,
    stepSlider: 0.1,
  },
  marvin: {
    filter:'invert',
    measure: '%',
    minRange: 0,
    maxRange: 100,
    startSlider: 100,
    stepSlider: 1,
  },
  phobos: {
    filter:'blur',
    measure: 'px',
    minRange: 0,
    maxRange: 3,
    startSlider: 3,
    stepSlider: 0.1,
  },
  heat: {
    filter:'brightness',
    measure: '',
    minRange: 1,
    maxRange: 3,
    startSlider: 3,
    stepSlider: 0.1,
  }
};

export {Scale, FILTERS_EFFECTS};
