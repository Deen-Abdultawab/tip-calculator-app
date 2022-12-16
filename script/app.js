
let tipBtns = document.querySelector('.tip-btns');
let amountPerPerson = document.querySelector('.amt-per-person');
let totalAmountPerPerson = document.querySelector('.total-per-person');
const btnArray = Array.from(document.querySelectorAll('.tip-btn'));
let warningContainer = document.querySelector('.row3');
let resetBtn = document.querySelector('.reset-btn');
let customHTML = document.querySelector('.custom-btn');
let tipPercent;
let customValue;
let numOfPeople;
let bill;

// Cualculating with custom tip percent
window.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') {
    customValue = Number(document.getElementById('custom').value) / 100;
    numOfPeople = Number(document.getElementById('num').value);
    bill = Number(document.getElementById('bill').value);

    if(customValue > 0){
      tipPercent = customValue;
      if(bill > 0){
        if(numOfPeople > 0){
          calcTip(); 
        } else {
          warningContainer.classList.add('show-row3');
        };
      } 
      else {
        alert(`bill cannot be negative or zero`);
        clearResults();
      }
    } else {
      alert(`set tip percent`);
      clearResults();
    }  
  } 
});

// Cualculating with defined tip percent

tipBtns.addEventListener('click', (e) => {
  let eventCLass = e.target.classList;

  if(eventCLass.contains('tip-btn')){ 
    customHTML.innerHTML = `<input type="number" placeholder="Custom" id="custom">`
    customValue;
  }

  if(eventCLass.contains('tip-btn')){
    
    tipPercent = Number(e.target.textContent.replace('%','')) / 100;
    bill = Number(document.getElementById('bill').value);
    numOfPeople = Number(document.getElementById('num').value);
    customValue = Number(document.getElementById('custom').value);    

    removeBtnActive();
  
    eventCLass.add('btn-active');

    if(bill > 0){
      calcTip(); 
    } else {
      alert(`bill cannot be negative or zero`);
      removeBtnActive();
      clearResults();
    };
    
  } else if(!eventCLass.contains('tip-btn')) {
    removeBtnActive();
    tipPercent;
  }
});

resetBtn.addEventListener('click', () => {
  clearResults();
  customHTML.innerHTML = `<input type="number" placeholder="Custom" id="custom">`;
  warningContainer.classList.remove('show-row3');
  document.getElementById('num').value = '';
  document.getElementById('bill').value = '';
  removeBtnActive();
 

  tipPercent;
  customValue;
  numOfPeople;
  bill;

})

// Main Functions
function roundToTwo(num){
  return +(Math.round(num +'e+2') + 'e-2');
}

function removeBtnActive(){
  btnArray.map((e) => {
    if(e.classList.contains('btn-active')){
      e.classList.remove('btn-active');
    }
  })
}

function clearResults() {
  amountPerPerson.textContent = '$0.00';
  totalAmountPerPerson.textContent = '$0.00';
}

function calcTip() {
  if(numOfPeople > 0){    
    let tipPerPerson = (bill * tipPercent) / numOfPeople;
    let totalBillPerPerson = (bill / numOfPeople) + tipPerPerson;
    warningContainer.classList.remove('show-row3');
    amountPerPerson.textContent = `$${roundToTwo(tipPerPerson)}`;
    totalAmountPerPerson.textContent = `$${roundToTwo(totalBillPerPerson)}`;
  } 
  else {
    warningContainer.classList.add('show-row3');
    removeBtnActive();

  }

}





