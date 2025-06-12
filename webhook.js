const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/brevo-webhook', (req, res) => {
  const data = JSON.stringify(req.body, null, 2);
  const filename = `brevo_event_${Date.now()}.json`;
  fs.writeFileSync(filename, data);
  res.status(200).send('Event received and saved');
});

// Endpoint to display all saved webhook responses
app.get('/responses', (req, res) => {
  const dir = __dirname;
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).send('Error reading directory');
    const jsonFiles = files.filter(f => f.startsWith('brevo_event_') && f.endsWith('.json'));
    const responses = jsonFiles.map(f => {
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      return { filename: f, data: JSON.parse(content) };
    });
    res.json(responses);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});