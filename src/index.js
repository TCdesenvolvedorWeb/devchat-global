const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepPosition = document.querySelectorAll('.step-position');
const form = document.getElementsByTagName('form');
const toggleButton = document.querySelector('.switch input');
const price = document.querySelectorAll('.price');
const yearlyOption = document.querySelectorAll('.yearly-option');
const periodOption = document.querySelectorAll('.select-period-option');
const plans = document.querySelectorAll('.plans');
const inputPersonalInfo = document.querySelectorAll('.input-personal-info');
const requiredMessage = document.querySelectorAll('.required-message');
const addOns = document.querySelectorAll('.add-ons');
const priceServices = document.querySelectorAll('.price-services')


let formAtual = 0;

function validateForm() {
    const emptyInput = [...inputPersonalInfo].some(input => input.value === '');
    if (emptyInput) {
        validateInput();
        messageFildIsRequired(emptyInput);
    } else {

        const formAtivo = document.querySelector('.active');
        formAtivo.classList.remove('active');
        formAtual++;
        form[formAtual].classList.add('active');

        const stepActive = document.querySelector('.active-state');
        stepActive.classList.remove('active-state');
        stepPosition[formAtual].classList.add('active-state');

        const btnBackDisable = document.querySelector('.disable');

        if (btnBackDisable) {
            btnBackDisable.classList.remove('disable');
        }

        messageFildIsRequired(emptyInput);
    }
}

function messageFildIsRequired(emptyInput) {
    requiredMessage.forEach((message, index) => {
        if (emptyInput && inputPersonalInfo[index].value === "") {
            message.classList.add('show');
        } else {
            message.classList.remove('show');
        }
    });
}

function validateInput() {
    inputPersonalInfo.forEach(input => {
        if (input.value === '') {
            input.classList.add('required');
        } else {
            input.classList.remove('required');
        }
    })

}

btnNext.addEventListener('click', () => {
    if (formAtual === form.length - 1) return

    validateForm();
})


btnBack.addEventListener('click', () => {
    if (formAtual === 0) return

    const formAtivo = document.querySelector('.active');
    formAtivo.classList.remove('active');
    formAtual--;
    form[formAtual].classList.add('active');

    const stepActive = document.querySelector('.active-state');
    stepActive.classList.remove('active-state');
    stepPosition[formAtual].classList.add('active-state');

    if (formAtual === 0) {
        btnBack.classList.add('disable')
    }
    validateInput();
})

let contador = 0;
let valor = 'monthly';
toggleButton.addEventListener('change', function () {
    if (toggleButton.checked) {
        yearlyOption.forEach(element => {
            element.classList.add('opacity');
        })

        periodOption[contador].classList.remove('selected');
        contador++;
        periodOption[contador].classList.add('selected');

        price.forEach((e, index) => {
            if (index === 0) e.innerHTML = '$90/yr';
            if (index === 1) e.innerHTML = '$120/yr';
            if (index === 2) e.innerHTML = '$150/yr';
        }

        );
        priceServices.forEach((e, index) => {
            if (index === 0) e.innerHTML = '+$10/yr'
            if (index === 1) e.innerHTML = '+$20/yr'
            if (index === 2) e.innerHTML = '+$20/yr'
        })
        valor = 'yearly'

    } else {
        yearlyOption.forEach(element => {
            element.classList.remove('opacity');
        })

        periodOption[contador].classList.remove('selected');
        contador--;
        periodOption[contador].classList.add('selected');

        price.forEach((e, index) => {
            if (index === 0) e.innerHTML = '$9/mo';
            if (index === 1) e.innerHTML = '$12/mo';
            if (index === 2) e.innerHTML = '$15/mo';
        });
        priceServices.forEach((e, index) => {
            if (index === 0) e.innerHTML = '+$1/mo'
            if (index === 1) e.innerHTML = '+$2/mo'
            if (index === 2) e.innerHTML = '+$2/mo'
        })
        valor = 'monthly'

    }
})

plans.forEach(plan => {
    plan.addEventListener('click', (e) => {
        e.preventDefault()

        const planActuallyActive = document.querySelector('.selected');

        planActuallyActive && planActuallyActive.classList.remove('selected');

        plan.classList.toggle('selected');

    })
})

const summary = document.querySelector('.summary');


addOns.forEach((addOn, index) => {
    addOn.addEventListener("change", () => {
        if (!addOn.classList.contains("checked")) {
            addOn.classList.add("checked");
        } else {
            addOn.classList.remove("checked");
        }

        if (summary.querySelector(`.option-${index}`)) {
            summary.querySelector(`.option-${index}`).remove();
            return
        }

        if (index === 0 && !summary.querySelector(`.option-${index}`)) {
            summary.insertAdjacentHTML(
                'beforeend',
                `
                    <li class="plan-option option-${index}">
                        <p> Online service </p>
                        <p> +1/mo </p>
                    </li>`
            );

        } else {
            summary.insertAdjacentHTML(
                'beforeend',
                `
                <li class="plan-option option-${index}">
                    <p> Online service </p>
                    <p> +10/yr </p>
                </li>`
            );
        }
        if (index === 1 && !summary.querySelector(`.option-${index}`)) {
            summary.insertAdjacentHTML(
                'beforeend',
                `
                    <li class="plan-option option-${index}">
                        <p> Larger storage </p>
                        <p> +2/mo </p>
                    </li>`
            );

        } else {
            summary.insertAdjacentHTML(
                'beforeend',
                `
                <li class="plan-option option-${index}">
                    <p> Larger storage </p>
                    <p> +20/yr </p>
                </li>`
            );
        }
        if (index === 2 && !summary.querySelector(`.option-${index}`)) {
            summary.insertAdjacentHTML(
                'beforeend',
                `
                    <li class="plan-option option-${index}">
                        <p> Customizable Profile </p>
                        <p> +2/mo </p>
                    </li>`
            );
        } else {
            summary.insertAdjacentHTML(
                'beforeend',
                `
                <li class="plan-option option-${index}">
                    <p> Customizable Profile </p>
                    <p> +20/yr </p>
                </li>`
            );
        }
    });
});

document.getElementById('btn-change').addEventListener('click', (e) => {
    e.preventDefault();
    formAtual = 1;
    const formAtivo = document.querySelector('.active');
    formAtivo.classList.remove('active');
    form[formAtual].classList.add('active');

    const stepActive = document.querySelector('.active-state');
    stepActive.classList.remove('active-state');
    stepPosition[formAtual].classList.add('active-state');
});



