const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const http = require('http');
const enforce = require('express-sslify');

app.use(express.json());

// use the express-static middleware
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(enforce.HTTPS( { trustProtoHeader: true }));
app.use(
  cors({
    origin: ["https://champzendesk.herokuapp.com"],
  })
);
app.use(function(err, req, res, next) {
  if(!err) return next();
  console.log("Input error!");
  res.send("Input error!");
});


app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.post("/createtickets", async (req, res) => {
    const dataToSend = JSON.stringify(req.body);
    const token = req.body.apiToken;
    try {
    const zdResponse = await axios.post(
        "https://clickup.zendesk.com/api/v2/tickets/create_many",
        dataToSend,
        {
          headers: {
            Authorization: "Bearer " + token,
            "content-type": "application/json",
          },
        }
    );
    console.log(zdResponse.data);
    const responseWasSuccessful = zdResponse.status == 200 ? true : false;
    const finalResponse = {success: responseWasSuccessful};
    res.json(finalResponse)
    } catch (error) {
      res.json({success: false});
      console.log("error");
    }
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
