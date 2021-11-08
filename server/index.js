require('dotenv').config()

const express = require('express')
const app = express()
const port = 3001
const API_KEY = process.env.RAPID_API_KEY
var unirest = require("unirest")
var cors = require('cors')

app.use(cors())
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})


app.get('/api', (incomingRequest, outgoingResponse) => {

	// res.send('hello')
	// res.sendFile(path.join(__dirname, '../client/public', 'index.html'));

  var rapidApiRequest = unirest("GET", "https://v1-sneakers.p.rapidapi.com/v1/sneakers");

	rapidApiRequest.query({
		"limit": "100"
	});

	rapidApiRequest.headers({
		"x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
		"x-rapidapi-key": API_KEY,
		"useQueryString": true,
		// "Access-Control-Allow-Origin": "http://localhost:3000",
		// "Access-Control-Allow-Credentials": true
	});

	rapidApiRequest.end(function (rapidApiResponse) {
		if (rapidApiResponse.error) throw new Error(rapidApiResponse.error);

		console.log(rapidApiResponse.body);

		outgoingResponse.send(rapidApiResponse.body)
	});

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



