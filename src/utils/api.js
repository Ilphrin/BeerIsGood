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

function signup(email, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${url}/user/signup`, {
      email,
      password,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function signin(email, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${url}/user/signin`, {
      email,
      password,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  getCorrespondances,
  getTip,
  signin,
  signup,
};
