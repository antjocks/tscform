const express = require('express');
const app = express();
const PORT = 8080;

app.use( express.json() ) 

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

app.get('/', function(req, res) {
  //res.sendFile('/Volumes/Macintosh HD/Users/anthony/Desktop/TSCform/champzd.html');
  res.sendFile('public/index.html');
});

app.get('/api', (req, res) => {
  res.status(200).send({
    title: 'test',
    body: 'body',
  });
});

app.post('/createtickets', (req, res) => {
	
	const { key } = req.key;
	const { email } = req.email;
	
	if (!string) {
		res.status(418).send({ message: 'You need a string!' })
	}
	
	res.send({
		body: `${string} and ID of ${id}`,
	});
	
});