import axios from 'axios';

const url = 'https://powerful-brushlands-44194.herokuapp.com';

function getCorrespondances(name) {
  return new Promise((resolve) => {
    axios.get(`${url}/beers/${name}`)
      .then((res) => {
        resolve(res.data);
      });
  });
}

function getTip() {
  return new Promise((resolve) => {
    axios.get(`${url}/tips`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  });
}

module.exports = {
  getCorrespondances,
  getTip,
};
