const btnNext = document.getElementById("btn-next");
const btnBack = document.getElementById("btn-back");
const stepPosition = document.querySelectorAll(".step-position");
const form = document.getElementsByTagName("form");
const toggleButton = document.querySelector(".switch input");
const price = document.querySelectorAll(".price");
const yearlyOption = document.querySelectorAll(".yearly-option");
const periodOption = document.querySelectorAll(".select-period-option");
const plans = document.querySelectorAll(".plans");
const inputPersonalInfo = document.querySelectorAll(".input-personal-info");
const requiredMessage = document.querySelectorAll(".required-message");
const addOns = document.querySelectorAll(".add-ons");
const priceServices = document.querySelectorAll(".price-services");
const planFinalPrice = document.querySelector(".plan-final-price");
const planName = document.querySelector(".plan-name");

let formAtual = 0;

function validateForm() {
  const emptyInput = [...inputPersonalInfo].some((input) => input.value === "");

  if (emptyInput) {
    validateInput();
    messageFildIsRequired(emptyInput);
  } else {
    nextPage();
    changeStep();
    disableButtonBack();
    messageFildIsRequired(emptyInput);
  }
}

const disableButtonBack = () => {
  const btnBackDisable = document.querySelector(".disable");

    if (btnBackDisable) {
      btnBackDisable.classList.remove("disable");
    }
}

const changeStep = () => {
  const stepActive = document.querySelector(".active-state");
  stepActive.classList.remove("active-state");
  stepPosition[formAtual].classList.add("active-state");
};

function messageFildIsRequired(emptyInput) {
  requiredMessage.forEach((message, index) => {
    if (emptyInput && inputPersonalInfo[index].value === "") {
      message.classList.add("show");
    } else {
      message.classList.remove("show");
    }
  });
}

function validateInput() {
  inputPersonalInfo.forEach((input) => {
    if (input.value === "") {
      input.classList.add("required");
    } else {
      input.classList.remove("required");
    }
  });
}

btnNext.addEventListener("click", () => {
  if (formAtual === form.length - 1) return;

  validateForm();
});

const nextPage = () => {
  const formAtivo = document.querySelector(".active");
  formAtivo.classList.remove("active");
  formAtual++;
  form[formAtual].classList.add("active");
};

btnBack.addEventListener("click", () => {
  if (formAtual === 0) return;

  returnPage();

  changeStep();

  if (formAtual === 0) {
    btnBack.classList.add("disable");
  }
  validateInput();
});

const returnPage = () => {
  const formAtivo = document.querySelector(".active");
  formAtivo.classList.remove("active");
  formAtual--;
  form[formAtual].classList.add("active");
};

toggleButton.addEventListener("change", function () {
  if (toggleButton.checked) {
    setYearly();
  } else {
    setMonthly();
  }

  updateSummary();
});

const setYearly = () => {
  yearlyOption.forEach((element) => element.classList.add("opacity"));
    periodOption.forEach((option) => option.classList.remove("selected"));
    periodOption[1].classList.add("selected");

    price.forEach((e, index) => {
      const yearlyPrices = ["$90/yr", "$120/yr", "$150/yr"];
      e.innerHTML = yearlyPrices[index];
    });

    priceServices.forEach((e, index) => {
      const yearlyPricesServices = ["+$10/yr", "+$20/yr", "+$20/yr"];
      e.innerHTML = yearlyPricesServices[index];
    });
}

const setMonthly = () => {
  yearlyOption.forEach((element) => element.classList.remove("opacity"));
    periodOption.forEach((option) => option.classList.remove("selected"));
    periodOption[0].classList.add("selected");

    price.forEach((e, index) => {
      const monthlyPrices = ["$9/mo", "$12/mo", "$15/mo"];
      e.innerHTML = monthlyPrices[index];
    });

    priceServices.forEach((e, index) => {
      const monthlyPricesServices = ["+$1/mo", "+$2/mo", "+$2/mo"];
      e.innerHTML = monthlyPricesServices[index];
    });
}

plans.forEach((plan, index) => {
  plan.addEventListener("click", (e) => {
    e.preventDefault();

    const planActuallyActive = document.querySelector(".selected");

    planActuallyActive && planActuallyActive.classList.remove("selected");

    plan.classList.toggle("selected");

    showSelectedPlan();
    calculateTotalPrice();
  });
});

const showSelectedPlan = () => {
  const plan = document.querySelector(".selected");

  const planNameSelected = plan.querySelector("h2").textContent;
  const planPrice = plan.querySelector(".price").textContent;

  if (planNameSelected && planPrice) {
    planName.textContent = planNameSelected;
    planFinalPrice.textContent = planPrice;
  }
};
showSelectedPlan();

const summary = document.querySelector(".summary");

const updateSummary = () => {
  const isYearly = toggleButton.checked;

  addOns.forEach((addOn, index) => {
    const option = summary.querySelector(`.option-${index}`);

    if (option) {
      if (index === 0) {
        option.querySelector("p:last-child").textContent = isYearly
          ? "+$10/yr"
          : "+$1/mo";
      } else if (index === 1) {
        option.querySelector("p:last-child").textContent = isYearly
          ? "+$20/yr"
          : "+$2/mo";
      } else if (index === 2) {
        option.querySelector("p:last-child").textContent = isYearly
          ? "+$20/yr"
          : "+$2/mo";
      }
    }
  });
  showSelectedPlan();
  calculateTotalPrice();
};

const showAddons = () => {
  addOns.forEach((addOn, index) => {
    addOn.addEventListener("change", () => {
      if (!addOn.classList.contains("checked")) {
        addOn.classList.add("checked");
      } else {
        addOn.classList.remove("checked");
      }

      if (summary.querySelector(`.option-${index}`)) {
        summary.querySelector(`.option-${index}`).remove();
        updateSummary();
        return;
      }

      const isYearly = toggleButton.checked;

      if (index === 0) {
        summary.insertAdjacentHTML(
          "beforeend",
          `
                              <li class="plan-option option-${index}">
                                  <p> Online service </p>
                                  <p class='addon-price'> ${
                                    isYearly ? "+$10/yr" : "+$1/mo"
                                  } </p>
                              </li>`
        );
      }
      if (index === 1) {
        summary.insertAdjacentHTML(
          "beforeend",
          `
                              <li class="plan-option option-${index}">
                                  <p> Larger storage </p>
                                  <p class='addon-price'> ${
                                    isYearly ? "+$20/yr" : "+$2/mo"
                                  } </p>
                              </li>`
        );
      }
      if (index === 2) {
        summary.insertAdjacentHTML(
          "beforeend",
          `
                              <li class="plan-option option-${index}">
                                  <p> Customizable Profile </p>
                                  <p class="addon-price"> ${
                                    isYearly ? "+$20/yr" : "+$2/mo"
                                  } </p>
                              </li>`
        );
      }
      updateSummary();
    });
  });
};
showAddons();

document.getElementById("btn-change").addEventListener("click", (e) => {
  e.preventDefault();
  formAtual = 1;
  const formAtivo = document.querySelector(".active");
  formAtivo.classList.remove("active");
  form[formAtual].classList.add("active");

  const stepActive = document.querySelector(".active-state");
  stepActive.classList.remove("active-state");
  stepPosition[formAtual].classList.add("active-state");
});

const extractNumber = (string) => {
  const match = string.match(/\d+(\.\d+)?/);
  return match ? parseInt(match[0]) : 0;
};

const calculateTotalPrice = () => {
  const totalValue = document.querySelector(".total-value");
  const isYearly = toggleButton.checked;

  const FinalPriceText = document.querySelector(".plan-final-price").textContent;
  const finalPrice = extractNumber(FinalPriceText);

  const addons = document.querySelectorAll(".addon-price");
  let addonsTotal = 0;

  addons.forEach((addon) => {
    const addonPriceText = addon.textContent;
    addonsTotal += extractNumber(addonPriceText);
  });

  const total = finalPrice + addonsTotal;
  totalValue.textContent = `$${total}/${isYearly ? "yr" : "mo"}`;
};
calculateTotalPrice();