const inputRange = document.getElementById("entrynum");
const activeColor = "#442577a3";
const inactiveColor = "#dddddd";

inputRange.addEventListener("input", function() {
  const ratio = (this.value - this.min) / (this.max - this.min) * 100;
  this.style.background = `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
});

function updateSpan(value) {
    document.getElementById("entriesnum").textContent = value;
  }

  // Initialize the span with the default value
  document.addEventListener("DOMContentLoaded", function () {
    const rangeInput = document.getElementById("entrynum");
    updateSpan(rangeInput.value);
  });