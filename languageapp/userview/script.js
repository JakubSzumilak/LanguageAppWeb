// span number updater
  const inputRange = document.getElementById("entrynum");
  const activeColor = "#442577a3";
  const inactiveColor = "#aaaaaa";

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


// range based disable text inputs
  document.addEventListener("DOMContentLoaded", () => {
    const rangeInput = document.getElementById("entrynum");
    const textInputs = document.querySelectorAll(".custom_input .input");

    function updateTextInputs(value) {
        // Convert value to a number
        const entries = Number(value);
        
        // Enable or disable inputs based on the range value
        textInputs.forEach((input, index) => {
            if (index < entries) {
                input.disabled = false;
                input.style.backgroundColor = ""; // Reset background if any
                input.style.border = "";
            } else {
                input.disabled = true;
                input.style.backgroundColor = "#595e51"; // Optional: Set a visual indicator
                input.style.border = "4px double #937ABD";
            }
        });
    }

    // Initialize on page load
    updateTextInputs(rangeInput.value);

    // Update on range input change
    rangeInput.addEventListener("input", (event) => {
        updateTextInputs(event.target.value);
    });
});