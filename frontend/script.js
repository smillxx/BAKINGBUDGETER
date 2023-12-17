document.getElementById('calculate').addEventListener('click', function() {
    var recipeFile = document.getElementById('recipeFile').files[0];
    var costFile = document.getElementById('costFile').files[0];
    var overhead = document.getElementById('overhead').value;

    // Check if files are selected
    if (!recipeFile || !costFile) {
        alert("Please upload both recipe and cost files.");
        return;
    }

    // Create FormData to send files
    var formData = new FormData();
    formData.append('recipeFile', recipeFile);
    formData.append('costFile', costFile);
    formData.append('overhead', overhead);

    fetch('/calculate', { // Backend endpoint
        method: 'POST',
        body: formData
    }).then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Total Cost: ${data.totalCost}`;
    }).catch(error => {
        console.error('Error:', error);
    });
});
