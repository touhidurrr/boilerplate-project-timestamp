const express = require("express");
const cors = require("cors");

// init app
const app = express();

// enable CORS for freeCodeCamp
app.use(cors({ optionsSuccessStatus: 200 }));

// serve site files 'public' folder
app.use(express.static("public"));

// Timestamp Microservice API
app.get("/api/:date?", function (req, res) {
  let date;

  if (typeof req.params.date !== "string") {
    date = new Date();
  } else {
    const millis = +req.params.date;

    date = new Date(!isNaN(millis) ? millis : req.params.date);
  }

  const unix = date.getTime();

  if (isNaN(unix)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json({
    unix,
    utc: date.toUTCString(),
  });
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
