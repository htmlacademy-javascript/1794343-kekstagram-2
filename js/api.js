const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};

const loadData = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });

const getData = () => loadData(Route.GET_DATA);

const sendData = (body) => loadData(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
