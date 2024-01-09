"use strict";

let startDate;
let endDate;
let selectedMeasure = "days";
let selectedDaysType = "alldays";

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
    console.log(`Difference beetween days: ${result} ${selectedMeasure} (${selectedDaysType})`);
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











/*

const addWeekButton = document.querySelector(".week");
const addMonthButton = document.querySelector(".month");

addWeekButton.addEventListener("click", handleAddWeekClick);
addMonthButton.addEventListener("click", handleAddMonthlick);

function handleAddWeekClick(){

}

function handleAddMonthClick(){
    
}*/