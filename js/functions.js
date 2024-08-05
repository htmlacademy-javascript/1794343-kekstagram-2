//String length checking - запись в виде стрелочной функции, функциональное выражение
const checkStringLength = (string = '', maxLength = 1) =>
  string.length <= maxLength;
// Строка короче 20 символов
checkStringLength('Обратите внимание', 20);
// Длина строки ровно 14 символов
checkStringLength('Помятые купюры', 14);
// Строка длиннее 10 символов
checkStringLength('Задание считается выполненным', 10);


//Palindromic string checking - полная запись, декларативное объявление
function checkPalindrome (string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string.at(i);
  }
  return string === reversedString;
}
// Строка является палиндромом
checkPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
checkPalindrome('ДовОд'); // true
// Это не палиндром
checkPalindrome('Кекс'); // false
// Это палиндром
checkPalindrome('Лёша на полке клопа нашёл '); // true


//String to number
const extractNumber = (string) => {
  let newNumber = '';
  string = string.toString();
  for (let i = 0; i <= string.length - 1; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      newNumber += string[i];
    }
  }
  return Number(newNumber) || NaN;
};
extractNumber('2023 год');// 2023
extractNumber('ECMAScript 2022');// 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007');// 7
extractNumber('а я томат');// NaN

