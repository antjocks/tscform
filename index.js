const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = 3000;

app.use(express.json());

// use the express-static middleware
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(
  cors({
    origin: ["https://champzendesk.herokuapp.com"],
  })
);

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.post("/createtickets", async (req, res) => {
  const dataToSend = JSON.stringify(req.body);
  const token = req.body.apiToken;

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
  const finalResponse = { success: responseWasSuccessful };
  res.json(finalResponse);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
