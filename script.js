const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const customTipInput = document.querySelector("#custom-tip");

const tipButtons = document.querySelectorAll("[data-tip]");

const tipAmountOutput = document.querySelector("#tip-amount");
const totalOutput = document.querySelector("#total");

const resetButton = document.querySelector(".reset-button");
const peopleGroup = document.querySelector(".group-people");

let selectedTip = 0;


// CALCULATE
function calculate() {
    const bill = Number(billInput.value);
    const people = Number(peopleInput.value);

    if (bill <= 0 || people <= 0 || selectedTip <= 0) {
        tipAmountOutput.textContent = "$0.00";
        totalOutput.textContent = "$0.00";

        updateResetButton();
        return;
    }

    const tipTotal = bill * (selectedTip / 100);

    const tipPerPerson = tipTotal / people;
    const totalPerPerson = (bill + tipTotal) / people;

    tipAmountOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalOutput.textContent = `$${totalPerPerson.toFixed(2)}`;

    updateResetButton();
}


// TIP BUTTONS
tipButtons.forEach((button) => {
    button.addEventListener("click", () => {

        tipButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedTip = Number(button.dataset.tip);

        customTipInput.value = "";

        calculate();
    });
});


// CUSTOM TIP
customTipInput.addEventListener("input", () => {

    tipButtons.forEach((button) => {
        button.classList.remove("selected");
    });

    selectedTip = Number(customTipInput.value);

    calculate();
});


// BILL
billInput.addEventListener("input", () => {
    calculate();
});


// PEOPLE
peopleInput.addEventListener("input", () => {
    const people = Number(peopleInput.value);

    if (peopleInput.value !== "" && people === 0) {
        peopleGroup.classList.add("error");
    } else {
        peopleGroup.classList.remove("error");
    }

    calculate();
});


// RESET BUTTON STATE
function updateResetButton() {
    const hasValues =
        billInput.value !== "" ||
        peopleInput.value !== "" ||
        customTipInput.value !== "" ||
        selectedTip !== 0;

    resetButton.disabled = !hasValues;
}


// RESET
resetButton.addEventListener("click", () => {

    billInput.value = "";
    peopleInput.value = "";
    customTipInput.value = "";

    selectedTip = 0;

    tipButtons.forEach((button) => {
        button.classList.remove("selected");
    });

    peopleGroup.classList.remove("error");

    tipAmountOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";

    resetButton.disabled = true;
});