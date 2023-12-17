const express = require('express');
const router = express.Router();
const calculator = require('../utils/calculator');

/**
 * POST endpoint to calculate the cost of a recipe.
 * This endpoint expects multipart/form-data with 'recipeFile', 'costFile', and 'overhead'.
 */
router.post('/', (req, res) => {
    // Ensure that both files are provided
    if (!req.files || !req.files.recipeFile || !req.files.costFile) {
        return res.status(400).send('Both recipe and cost files are required.');
    }

    const recipeFile = req.files.recipeFile;
    const costFile = req.files.costFile;
    const overhead = parseFloat(req.body.overhead) || 0; // Default to 0 if not provided

    // Call the calculator function
    calculator.calculateCost(recipeFile, costFile, overhead, (err, totalCost) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error processing files');
        }
        res.json({ totalCost: totalCost.toFixed(2) }); // Sending back the total cost
    });
});

module.exports = router;
