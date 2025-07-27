const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// ADDITION
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 + num2;
    res.send(`Result: ${result}`);
});

// SUBTRACTION
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 - num2;
    res.send(`Result: ${result}`);
});

// MULTIPLICATION
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const result = num1 * num2;
    res.send(`Result: ${result}`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
