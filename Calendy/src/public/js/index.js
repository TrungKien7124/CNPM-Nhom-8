import CalendarFunc from './calendar.js';

const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.calendar .date'),
    prevButton = document.querySelector('.calendar .prev'),
    nextButton = document.querySelector('.calendar .next'),
    left__day_container = document.querySelector('.calendar .days'),
    goToDateForm = document.querySelector('.calendar .goToDate'),
    inputDate = document.querySelector('.calendar .goToDate .inputDate'),
    goToDateButton = document.querySelector('.calendar .goToDate .goToButton'),
    eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector('.event-date'),
    addEvent = document.querySelector('.add-event'),
    addEventWrapper = document.querySelector('.add-event-wrapper'),
    eventWrapperOverlay = document.querySelector('.overlay'),
    closeAddEventForm = document.querySelector('.add-event-wrapper .close'),
    right__day_container = document.querySelector('.right .days');

let tmpDate = new Date();
let today = tmpDate.getDate();
let month = tmpDate.getMonth();
let year = tmpDate.getFullYear();

let weekdays = [
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Saturday",
    "Friday",
    "Sunday",
]

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

function init(today, month, year) {
    // show date
    date.innerHTML = CalendarFunc.getMonthDate(month, year);

    left__day_container.innerHTML = CalendarFunc.getMonthDays(today, month, year);
    right__day_container.innerHTML = CalendarFunc.getWeekDays(today, month, year);

    addDaysListener();
}

prevButton.addEventListener("click", () => {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    init(today, month, year);
});

nextButton.addEventListener("click", () => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    init(today, month, year);

});

date.addEventListener("click", () => {
    date.style.visibility = 'hidden'; 
    goToDateForm.style.visibility = 'visible';
});

goToDateButton.addEventListener("click", () => {

    var newDate = inputDate.value;
    var dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (dateRegex.test(newDate)) {
        tmp = newDate.split("/");
        month = parseInt(tmp[0]) - 1;
        year = parseInt(tmp[1]);
        init(today, month, year);
    
    } else {
        alert("Invalid Date!\nInput format: mm/yyyy !");
    }
    date.style.visibility = 'visible'; 
    goToDateForm.style.visibility = 'hidden';
});

init(today, month, year);

function addDaysListener() {
    document.querySelectorAll('.left .day:not(.prev-month, .next-month)').forEach(
        (e) => {
            e.addEventListener("click", () => {
                document.querySelector('.day.active').classList.remove('active');
                e.classList.add('active');
                init(e.innerHTML, month, year);
            })
        }
    );
}

addEvent.addEventListener("click", () => {
    addEventWrapper.classList.add('active');
    eventWrapperOverlay.style.visibility = 'visible';
})

closeAddEventForm.addEventListener("click", () => {
    addEventWrapper.classList.remove('active');
    eventWrapperOverlay.style.visibility = 'hidden';
})