const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const responsesArray = [];

app.post('/brevo-webhook', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  const filename = `brevo_event_${Date.now()}.json`;
  fs.writeFileSync(filename, data);
  responsesArray.push(req.body);
  res.status(200).send('Event received and saved');
});

// Endpoint to display all saved webhook responses
app.get('/responses', (req, res) => {
  res.json(responsesArray);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});