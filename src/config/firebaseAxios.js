import pureAxios from 'axios';

const axios = pureAxios.create({
  baseURL: 'https://playmate-finder.firebaseio.com/'
});

export default axios;