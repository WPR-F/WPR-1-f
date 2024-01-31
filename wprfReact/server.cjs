const express = require('express');
const path = require('path'); // Only need to import once
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'wprfReact', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});