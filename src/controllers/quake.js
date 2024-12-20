const axios = require('axios');
const xmlJs = require('xml-js');
const refactJsonQuake = require('../utils/refactJsonQuake');
const responseCreator = require('../utils/responseCreator');

const getLatestQuake = async (req, res) => {
  try {
    const result = await axios.get(
      'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml'
    );

    const quakes = xmlJs.xml2js(result.data, { compact: true, spaces: 2 });
    const refactoredJsonQuakes = refactJsonQuake(quakes);

    return res.status(200).send(responseCreator({ data: refactoredJsonQuakes }));
  } catch (error) {
    console.error('Error fetching quake data:', error);
    return res
      .status(500)
      .send(responseCreator({ message: 'Something went wrong' }));
  }
};

module.exports = { getLatestQuake };
