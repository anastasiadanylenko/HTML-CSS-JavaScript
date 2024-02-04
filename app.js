"use strict";

let startDate;
let endDate;
let selectedMeasure = "days";
let selectedDaysType = "alldays";
let result;


const submitButton = document.querySelector(".submit");

submitButton.addEventListener("click", submitForm);

function submitForm(event) {
event.preventDefault();

const date1Input = document.querySelector(".date1").value;
const date2Input = document.querySelector(".date2").value;

startDate = new Date(date1Input);
endDate = new Date(date2Input);

if(date1Input && date2Input) {

   if (endDate < startDate) {
    alert("The end date cannot be earlier than the start date");
   } else {
    const result = durationBetweenDates(startDate, endDate, selectedMeasure, selectedDaysType);
   const resultDisplay = document.getElementById("resultDisplay");
   resultDisplay.textContent = `Difference beetween days:${result} ${selectedMeasure} (${selectedDaysType})`;

    saveResult({
      startDate: new Date(date1Input),
      endDate: new Date(date2Input),
      result,
      measure: selectedMeasure,
      daysType: selectedDaysType,
      dateDifference: result.dateDifference
    });
    updateResultsTable();
   }
   } else {
      alert('Please select both dates');
}
}

function handleMeasureClick (measure) {
selectedMeasure = measure;
}

function handleDaysTypeClick(typeOfDays) {
    selectedDaysType = typeOfDays;
}

function durationBetweenDates(startDate, endDate, measure, typeOfDays) {

    let result =  startDate - endDate;


    switch(measure) {
        case 'seconds':
            result = result / 1000;
            break;
        case 'minutes':
            result = result / (1000 * 60);
            break;
        case 'hours':
            result = result / (1000 * 60 * 60);
            break;
        case 'days':
            result = result / (1000 * 60 * 60 * 24);
            break;
        default:
            return 'Default';

    }

 let count = 0;
    
        const currentDate = new Date(startDate);
    
        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay();
    
            if ((typeOfDays === 'workdays' && dayOfWeek >= 1 && dayOfWeek <= 5) ||
                (typeOfDays === 'weekends' && (dayOfWeek === 0 || dayOfWeek === 6)) ||
                (typeOfDays === 'alldays')) {
                count++;
            }
    
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (measure === 'hours' || measure === 'minutes' || measure === 'seconds') {
            return result;
        }
return count;
    }


const daysMeasure = document.querySelector(".days");
const hoursMeasure = document.querySelector(".hours");
const minutesMeasure = document.querySelector(".minutes");
const secondsMeasure = document.querySelector(".seconds");

daysMeasure.addEventListener("click", () => handleMeasureClick('days'));
hoursMeasure.addEventListener("click", () => handleMeasureClick('hours'));
minutesMeasure.addEventListener("click", () => handleMeasureClick('minutes'));
secondsMeasure.addEventListener("click", () => handleMeasureClick('seconds'));

const allDaysButton = document.querySelector(".all-days");
const workDaysButton = document.querySelector(".work-days");
const weekendsButton = document.querySelector(".weekends");

allDaysButton.addEventListener("click",()=> handleDaysTypeClick('alldays'));
workDaysButton.addEventListener("click", ()=> handleDaysTypeClick('workdays'));
weekendsButton.addEventListener("click", ()=> handleDaysTypeClick('weekends'));

const addWeekButton = document.querySelector('.week');
const addMonthButton = document.querySelector('.month');
const startDateInput = document.querySelector('.date1');
const endDateInput = document.querySelector('.date2');

let weekButtonClicks = 0;
let monthButtonClicks = 0;

addWeekButton.addEventListener('click', handleAddWeek);
addMonthButton.addEventListener('click', handleAddMonth);

function handleAddWeek() {
  weekButtonClicks++;
  updateEndDate(7 * weekButtonClicks);
}

function handleAddMonth() {
  monthButtonClicks++;
  updateEndDate(30 * monthButtonClicks);
}

function updateEndDate(days) {
  if (startDateInput.value) {
    const startDate = new Date(startDateInput.value);
    const newDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
    endDateInput.value = newDate.toISOString().slice(0, 10);
  }
}

const resultsKey = 'calculationResults';
const maxResultsCount = 10;

function saveResult(result) {
  let calculationResults = JSON.parse(localStorage.getItem(resultsKey))|| [];

  calculationResults.unshift({startDate, endDate, result, measure: selectedMeasure, daysType: selectedDaysType, dateDifference: durationBetweenDates(startDate, endDate, selectedMeasure, selectedDaysType)});

  calculationResults = calculationResults.slice(0, maxResultsCount);

  localStorage.setItem(resultsKey, JSON.stringify(calculationResults));
}



function updateResultsTable() {
  const calculationResults = JSON.parse(localStorage.getItem(resultsKey)) || [];
  const resultsBody = document.querySelector('#resultsBody');

  resultsBody.innerHTML = '';

  calculationResults.forEach((result) => {
    const row = document.createElement('tr');

    const startDateCell = document.createElement('td');
    startDateCell.textContent = result.startDate.toString();
    row.appendChild(startDateCell);

    const endDateCell = document.createElement('td');
    endDateCell.textContent = result.endDate.toString();
    row.appendChild(endDateCell);

    const dateDiffCell = document.createElement('td');
    dateDiffCell.textContent = `${result.dateDifference} ${selectedMeasure} (${selectedDaysType})`;
    row.appendChild(dateDiffCell);

    resultsBody.appendChild(row);
  });
}

updateResultsTable();



