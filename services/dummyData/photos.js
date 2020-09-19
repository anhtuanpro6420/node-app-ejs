const fetch = require('node-fetch');

const Photo = require('../../models/Photo');

const fetchPhotos = async () => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then((res) => res.json())
    .then((photos) => {
      console.log(photos);
      const requests = [];
      if (photos && photos.length) {
        photos.forEach((photo) => {
          requests.push({
            insertOne: {
              document: photo,
            },
          });
        });
        console.log(requests);
        Photo.bulkWrite(requests).then((res) => console.log(res));
      }
    });
};

module.exports = {
  fetchPhotos,
};
