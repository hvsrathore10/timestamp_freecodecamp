var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Date API endpoint
app.get("/api/:date?", function (req, res) {
  let { date } = req.params;

  // If no date is provided, use the current date
  if (!date) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
  }

  // Handle numeric strings (e.g., Unix timestamps)
  if (!isNaN(date)) {
    date = parseInt(date, 10);
  }

  const parsedDate = new Date(date);

  // Validate the parsed date
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the response
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log(`Server listening on http://localhost:${listener.address().port}`);
});
