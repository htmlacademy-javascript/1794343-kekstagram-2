import {getRandomInteger, createRandomIdFromRangeGenerator} from './util.js';
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
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const description = 'Я купил фотоаппарат, глядите, как снимает!';

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateUrl = createRandomIdFromRangeGenerator(1, 25); //photos/{{i}}.jpg
const generatelikes = createRandomIdFromRangeGenerator(15, 200);
const generateCommentsId = createRandomIdFromRangeGenerator(0, (Math.random()) * 10000);

const createComments = function () {
  return function () {
    const generateAvatarNumber = getRandomInteger(1, 6); //img/avatar-{{случайное число от 1 до 6}}.svg
    const generateName = getRandomInteger(0, NAMES.length - 1);
    const generateMessage = getRandomInteger(0, MESSAGES.length - 1);
    const comment = {};

    comment.id = generateCommentsId(); //- уникальное любое число,
    comment.avatar = `img/avatar-${generateAvatarNumber}.svg`; // 'img/avatar-6.svg',
    comment.message = MESSAGES[generateMessage];
    comment.name = NAMES[generateName];
    return comment;
  };
};

function createPhotoDescription () {
  const generateCommentsCount = getRandomInteger(0, 30);
  const photo = {};
  photo.id = generatePhotoId();
  photo.url = `photos/${generateUrl()}.jpg`;
  photo.description = description;
  photo.likes = generatelikes();
  photo.comments = Array.from({length: generateCommentsCount}, createComments());
  return photo;
}

const SIMILAR_PHOTO_COUNT = 25;
const similarPhotoDescription = () => Array.from({length: SIMILAR_PHOTO_COUNT}, createPhotoDescription);
export {similarPhotoDescription};
