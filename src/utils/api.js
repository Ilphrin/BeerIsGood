import axios from 'axios';

function getCorrespondances(name) {
  return new Promise((resolve) => {
    axios.get(`https://powerful-brushlands-44194.herokuapp.com/beers/${name}`)
      .then((res) => {
        resolve(res.data);
      });
  });
}

module.exports = {
  getCorrespondances,
};
