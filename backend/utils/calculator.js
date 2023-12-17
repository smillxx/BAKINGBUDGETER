const parse = require('csv-parse/lib/sync'); // For parsing CSV files

/**
 * Converts all units to a standard unit for comparison.
 * @param {number} quantity - The quantity to convert.
 * @param {string} unit - The unit of the quantity.
 * @return {number} - The quantity converted to a standard unit.
 */
function convertToStandardUnit(quantity, unit) {
    // This function should contain the logic to convert various units to a standard unit (e.g., grams for weight)
    // Below is a very simplified version. Real conversion would be more complex.
    const conversionRates = {
        cups: 240, // assuming 1 cup is 240 grams
        tablespoons: 15, // assuming 1 tablespoon is 15 grams
        teaspoons: 5, // assuming 1 teaspoon is 5 grams
        grams: 1,
        kilograms: 1000,
        ounces: 28.35,
        milliliters: 1, // assuming 1 milliliter equals 1 gram
        liters: 1000,
        pints: 473.176,
        quarts: 946.353,
    };

    return quantity * conversionRates[unit];
}

/**
 * Parses a CSV file content.
 * @param {string} content - The content of the CSV file.
 * @return {Array} - The parsed content.
 */
function parseCSV(content) {
    return parse(content, {
        columns: true,
        skip_empty_lines: true
    });
}

/**
 * Calculates the cost of each ingredient.
 * @param {Array} recipe - The recipe data.
 * @param {Array} costs - The cost data.
 * @return {Object} - The cost per ingredient.
 */
function calculateIngredientCosts(recipe, costs) {
    let ingredientCosts = {};

    recipe.forEach(item => {
        const recipeQuantity = convertToStandardUnit(item.quantity, item.unit);
        const costItem = costs.find(cost => cost.ingredient === item.ingredient);

        if (costItem) {
            const costQuantity = convertToStandardUnit(costItem.wholesaleQuantity, costItem.unit);
            const costPerUnit = costItem.cost / costQuantity;
            ingredientCosts[item.ingredient] = recipeQuantity * costPerUnit;
        }
    });

    return ingredientCosts;
}

/**
 * Calculates the total cost of the recipe.
 * @param {string} recipeFile - The recipe file data.
 * @param {string} costFile - The cost file data.
 * @param {number} overhead - The overhead percentage.
 * @return {number} - The total cost.
 */
exports.calculateCost = function(recipeFile, costFile, overhead, callback) {
    try {
        const recipe = parseCSV(recipeFile.data.toString());
        const costs = parseCSV(costFile.data.toString());

        let ingredientCosts = calculateIngredientCosts(recipe, costs);
        let totalCost = Object.values(ingredientCosts).reduce((sum, cost) => sum + cost, 0);

        // Applying overhead
        totalCost += (totalCost * (overhead / 100));

        callback(null, totalCost);
    } catch (error) {
        callback(error);
    }
};
