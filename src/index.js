const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepPosition = document.querySelectorAll('.step-position');
const form = document.getElementsByTagName('form');
const toggleButton = document.querySelector('.switch input');
const price = document.querySelectorAll('.price');
const yearlyOption = document.querySelectorAll('.yearly-option');
const periodOption = document.querySelectorAll('.select-period-option');
const plans = document.querySelectorAll('.plans');


let formAtual = 0;


btnNext.addEventListener('click', () => {
    
    // if (form === form[1]) {
    //     btnBack.classList.remove('disable');
    // }
    if (formAtual === form.length - 1) return

    const formAtivo = document.querySelector('.active');
    formAtivo.classList.remove('active');
    formAtual++;
    form[formAtual].classList.add('active');

    const stepActive = document.querySelector('.active-state');
    stepActive.classList.remove('active-state');
    stepPosition[formAtual].classList.add('active-state');
    
    const btnBackDisable = document.querySelector('.disable');

    btnBackDisable.classList.remove('disable')
    
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
    
})

let contador = 0;
toggleButton.addEventListener('change', function () {


    if (toggleButton.checked) {
        yearlyOption.forEach(element => {
            element.classList.add('opacity');
        })

        periodOption[contador].classList.remove('selected');
        contador++;
        periodOption[contador].classList.add('selected');

        console.log('ativou');

        price.forEach( (e , index) => {
            if(index === 0) e.innerHTML = '$90/yr';
            if(index === 1) e.innerHTML = '$120/yr';
            if(index === 2) e.innerHTML = '$150/yr';
        });

    } else {
        yearlyOption.forEach(element => {
            element.classList.remove('opacity');
        })

        price.innerHTML

        periodOption[contador].classList.remove('selected');
        contador--;
        periodOption[contador].classList.add('selected');

        price.forEach( (e , index) => {
            if(index === 0) e.innerHTML = '$9/mo';
            if(index === 1) e.innerHTML = '$12/mo';
            if(index === 2) e.innerHTML = '$15/mo';
        });
        console.log('desativou');

    }
})

plans.forEach(plan => {
    plan.addEventListener('click', (e) => {
        e.preventDefault()

        if (plan.classList.contains('selected')) {
            plan.classList.remove('selected')
            return
        } else {
            plan.classList.add('selected');
        }
        
    })
})

console.log(plans);


