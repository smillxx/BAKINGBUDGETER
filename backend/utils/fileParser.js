const parse = require('csv-parse/lib/sync'); // Synchronous parsing

/**
 * Parses the recipe file's CSV content.
 * @param {Buffer} fileContent - The content of the recipe file.
 * @return {Array} - An array of recipe items.
 */
function parseRecipeFile(fileContent) {
    try {
        const records = parse(fileContent, {
            columns: true, // Assumes the first row of CSV are column names
            skip_empty_lines: true
        });
        return records;
    } catch (error) {
        console.error("Error parsing recipe file:", error);
        throw error;
    }
}

/**
 * Parses the cost file's CSV content.
 * @param {Buffer} fileContent - The content of the cost file.
 * @return {Array} - An array of cost items.
 */
function parseCostFile(fileContent) {
    try {
        const records = parse(fileContent, {
            columns: true, // Assumes the first row of CSV are column names
            skip_empty_lines: true
        });
        return records;
    } catch (error) {
        console.error("Error parsing cost file:", error);
        throw error;
    }
}

module.exports = {
    parseRecipeFile,
    parseCostFile
};
