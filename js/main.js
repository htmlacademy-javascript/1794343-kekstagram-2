const NAMES = [
  'Марья',
  'Верон',
  'Мирабелла',
  'Ваня',
  'Мурка',
  'Властелин',
  'Кармайкл',
  'Стив',
];
const description = 'Я купил фотоаппарат, глядите, как снимает!';
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_PHOTO_COUNT = 1;

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateUrl = createRandomIdFromRangeGenerator(1, 25); //photos/{{i}}.jpg
const generatelikes = createRandomIdFromRangeGenerator(15, 200);
const generateCommentsId = createRandomIdFromRangeGenerator(0, (Math.random()) * 10000);
const generateAvatarNumber = createRandomIdFromRangeGenerator(1, 6); //img/avatar-{{случайное число от 1 до 6}}.svg
const generateName = getRandomInteger(0, NAMES.length - 1);
const generateMessage = getRandomInteger(0, MESSAGES.length - 1);

function createComments () {
  const totalComments = [];
  const generateCommentsCount = createRandomIdFromRangeGenerator(0, 30); //до 30
  if (generateCommentsCount === 0) {
    return 'Комментариев нет';
  }
  for (let i = 0; i <= generateCommentsCount; i++) {
    const comment = {
      id: generateCommentsId(), //- уникальное любое число,
      avatar: 'img/avatar-' + generateAvatarNumber() + '.svg', // 'img/avatar-6.svg',
      message: MESSAGES[generateMessage], //'В целом всё неплохо. Но не всё.',
      name: NAMES[generateName], //'Артём',
    };
    totalComments.push(comment);
  }
  //const similarComments = Array.from({length: generateCommentsCount, CreateComments});

  return totalComments;
}
function createPhotoDescription () {

  return {
    id: generatePhotoId(),
    url: 'photos/' + generateUrl() + '.jpg',
    description: description,
    likes: generatelikes(),
    comments: createComments(),
  };
}

const similarPhotoDescription = Array.from({length: SIMILAR_PHOTO_COUNT}, createPhotoDescription);

console.log(similarPhotoDescription);


