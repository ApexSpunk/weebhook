const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/brevo-webhook', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  const filename = `brevo_event_${Date.now()}.json`;
  fs.writeFileSync(filename, data);
  res.status(200).send('Event received and saved');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});