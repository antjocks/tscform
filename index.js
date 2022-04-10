const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3000;

app.use(express.json());

// use the express-static middleware
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.post("/createtickets", (req, res) => {
  const dataToSend = JSON.stringify(req.body);
  const token = req.body.apiToken;

  axios
    .post("https://nanza.zendesk.com/api/v2/tickets/create_many", dataToSend, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
    });
});

// app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
