let pastSumsHistory = [];

document.getElementById('submit-btn').addEventListener('click', function () {
    const periodInput = document.getElementById('period');
    const sumsInput = document.getElementById('sums');
    const periodText = periodInput.value.trim();
    const sumText = sumsInput.value.trim();

    if (periodText === "" || periodText === "Enter last 3 digits of the period draw") {
        alert("Please enter a valid period.");
        return;
    }

    const period = parseInt(periodText);
    if (isNaN(period)) {
        alert("Invalid period format. Please enter a number.");
        return;
    }

    const pastSums = sumText.split(" ").map(Number).filter(num => !isNaN(num) && num >= 0 && num <= 45);

    if (pastSums.length !== 6) {
        alert("Please enter exactly 6 past sums.");
        return;
    }

    pastSumsHistory.push(...pastSums);

    const predictions = generatePredictions(pastSums);
    addPredictionRow(period + 1, predictions.predictedSum, predictions.highLow, predictions.oddEven);
    periodInput.value = period + 1; // Increment the period input
    sumsInput.value = ""; // Clear sums input
});

function addPredictionRow(period, predictedSum, highLow, oddEven) {
    const tableBody = document.getElementById('predictions-table').querySelector('tbody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `<td>${period}</td><td>${predictedSum}</td><td>${highLow}</td><td>${oddEven}</td>`;
}

function generatePredictions(pastSums) {
    const predictedSum = pastSums[pastSums.length - 1] + 1; // Simple increment logic for now
    const highLow = predictedSum > 22 ? "High" : "Low";
    const oddEven = predictedSum % 2 === 0 ? "Even" : "Odd";

    return {
        predictedSum,
        highLow,
        oddEven
    };
}
