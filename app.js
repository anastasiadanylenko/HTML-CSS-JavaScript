"use strict"

const button = document.querySelector('.button');

function handleClick(event) {

    const buttonText = event.target.textContent;
    const container = document.querySelector('.container');
    const dateElement = document.querySelector('.date');
    const storageButtonStatus = localStorage.getItem('buttonStatus');
    const storageLastTurnOnStatus = localStorage.getItem('lastTurnOn');
    const storageLastTurnOffStatus = localStorage.getItem('lastTurnOff');

    if (buttonText === 'Turn off') {
        event.target.textContent = 'Turn on';
        localStorage.setItem('buttonStatus', 'Turn On');
        const date = new Date();
        dateElement.textContent = `Last turn off ${date}`;
        localStorage.setItem('lastTurnOff', date);
        dateElement.style.color = "white";
        container.style.backgroundColor = 'black';
    } else {
        event.target.textContent = 'Turn off';
        localStorage.setItem('buttonStatus', 'Turn Off');
        const date2 = new Date();
        dateElement.textContent = `Last turn on ${date2}`;
        localStorage.setItem('lastTurnOn', date2);
        dateElement.style.color = "black";
        container.style.backgroundColor = 'white';

        if (storageButtonStatus === null) {
            localStorage.setItem('buttonStatus', 'Turn On');
            localStorage.setItem('lastTurnOn', date2);
        }
    }
}

function updateDisplay() {

    const button = document.querySelector('.button');
    const container = document.querySelector('.container');
    const dateElement = document.querySelector('.date');

    const storageButtonStatus = localStorage.getItem('buttonStatus');
    const storageLastTurnOnStatus = localStorage.getItem('lastTurnOn');
    const storageLastTurnOffStatus = localStorage.getItem('lastTurnOff');

    if (storageButtonStatus === 'Turn On') {
        button.textContent = 'Turn on'
        dateElement.style.color = "white";
        container.style.backgroundColor = 'black';

        if (storageLastTurnOffStatus) {
            const date = new Date(storageLastTurnOffStatus);
            dateElement.textContent = `Last turn off: ${date}`;
        }

    } else {
        button.textContent = 'Turn off'
        dateElement.style.color = "black";
        container.style.backgroundColor = 'white';
    }

    if (storageLastTurnOnStatus) {
        const date = new Date(storageLastTurnOnStatus);
        dateElement.textContent = `Last turn on: ${date}`;
    }
}


button.addEventListener('click', handleClick);
updateDisplay();


