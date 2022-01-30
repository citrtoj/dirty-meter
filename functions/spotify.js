const url = require('url');
const axios = require('axios')
const params = new url.URLSearchParams({ grant_type: 'client_credentials' });
var client_id=process.env.SPOTIFY_API_ID
var client_secret=process.env.SPOTIFY_API_SECRET

const API_ENDPOINT = 'https://accounts.spotify.com/api/token'
exports.handler = async (event, context) => {
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token',params.toString(),{
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            }
      });
      console.log("did request")
      const data = await response.data;
      console.log("fetched");
      return {statusCode: 200, body: JSON.stringify({ data }) };
    } catch (error) {
      console.log('couldnt fetch token:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed fetching data' }),
      };
    }
  };