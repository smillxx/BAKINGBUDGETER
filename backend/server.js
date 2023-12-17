const express = require('express');
const fileUpload = require('express-fileupload');
const calculator = require('./utils/calculator');

const app = express();

app.use(fileUpload());

app.post('/calculate', (req, res) => {
    if (!req.files || !req.files.recipeFile || !req.files.costFile) {
        return res.status(400).send('No files were uploaded.');
    }

    let recipeFile = req.files.recipeFile;
    let costFile = req.files.costFile;
    let overhead = req.body.overhead || 0;

    // Call some function to process these files
    calculator.calculateCost(recipeFile, costFile, overhead, (err, totalCost) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ totalCost });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
