"use strict";


const countrySelect = document.getElementById('country');
const yearSelect = document.getElementById('year');
const searchButton = document.getElementById('search');
const holidaysContainer = document.getElementById('holidays');
const sortButton = document.getElementById('sortDateBtn');
const tableBody = document.getElementById('holidaysTableBody'); 
const apiKey = 'k7XKZGG2EBtk66hTlFAe4vcoBnCfiZJs'



fetch('https://calendarific.com/api/v2/countries?api_key=k7XKZGG2EBtk66hTlFAe4vcoBnCfiZJs') 
  .then(response => response.json())
  .then(data => {
    data.response.countries.forEach(country => {
      console.log(country);
      const option = document.createElement('option');
      option.value = country['iso-3166'];
      option.textContent = country.country_name;
      countrySelect.appendChild(option);
    });
    countrySelect.addEventListener('change', () => {
      yearSelect.disabled = false;
    });
  })
  .catch(error => {
   console.log('Error:', error);
  });


for (let i = 2001; i <= 2049; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  yearSelect.appendChild(option);
}
yearSelect.disabled = true;
const defaultYear = 2024;
  yearSelect.value = defaultYear.toString();



  searchButton.addEventListener('click', async () => {
    const selectedCountry = countrySelect.value;
    const selectedYear = yearSelect.value;
  
    if (selectedCountry && selectedYear) {
      try {
        const response = await fetch(`https://calendarific.com/api/v2/holidays?&api_key=k7XKZGG2EBtk66hTlFAe4vcoBnCfiZJs&country=${selectedCountry}&year=${selectedYear}`);
        const data = await response.json();
        if (data.response && data.response.holidays) {
        
holidays = data.response.holidays;

          if (holidays.length > 0) {
            tableBody.innerHTML = ''; 
           
            holidays.forEach(holiday => {
              const row = document.createElement('tr');

      row.innerHTML = `<td>${holiday.date.iso}</td><td>${holiday.name}</td>`;

      tableBody.appendChild(row);
    });
  } else {
    tableBody.innerHTML = '<tr><td colspan="2">No holidays found for the selected country and year.</td></tr>';
  }
} else {
  tableBody.innerHTML = '<tr><td colspan="2">No holidays data found.</td></tr>';
}
} catch(error) {
      console.log(error);
    } finally {
   }
  }});

 

  function displayHolidays(tableBody, holidays) {
    tableBody.innerHTML='';
    holidays.forEach(holiday => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${holiday.date.iso}</td><td>${holiday.name}</td>`;
      tableBody.appendChild(row);
    });
  }

  const sortOrderSelect = document.getElementById('sortOrder');

sortButton.addEventListener('click', () => {
  const selectedSortOrder = sortOrderSelect.value;
  const sortedHolidays = sortHolidays(holidays, selectedSortOrder);
  displayHolidays(tableBody, sortedHolidays);
});

function sortHolidays(holidays, sortOrder) {
  return holidays.sort((a, b) => {
    const dateA = new Date(a.date.iso);
    const dateB = new Date(b.date.iso);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
}
