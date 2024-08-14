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

//It's time for business
const convertHoursToMinutes = (time) => {
  const result = time.split(':');

  return Number(result[0]) * 60 + Number(result[1]);
};
const checkTime = function(timeStart, timeEnd, timeMeeting, timeDuration) {
  const minutesStart = convertHoursToMinutes(timeStart);
  const minutesEnd = convertHoursToMinutes(timeEnd);
  const minutesMeeting = convertHoursToMinutes(timeMeeting);
  return minutesMeeting >= minutesStart && (minutesMeeting + timeDuration) <= minutesEnd;
};

checkTime('08:00', '17:30', '14:00', 90); // true
checkTime('8:0', '10:0', '8:0', 120); // true
checkTime('08:00', '14:30', '14:00', 90); // false
checkTime('14:00', '17:30', '08:0', 90); // false
checkTime('8:00', '17:30', '08:00', 900); // false
