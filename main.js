// Launch main page:

const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(express.static(__dirname)); // serve static files from this directory
app.use(express.json());

app.post('/save-data', (req, res) => {
    const data = req.body;
    fs.writeFile('data.json', JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Failed to save data');
        }
        res.send('Data saved!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});