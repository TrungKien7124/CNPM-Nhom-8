import CalendarFunc from './calendar.js';

const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.calendar .date'),
    prevButton = document.querySelector('.calendar .prev'),
    nextButton = document.querySelector('.calendar .next'),
    left__day_container = document.querySelector('.calendar .days'),
    goToDateForm = document.querySelector('.calendar .goToDate'),
    inputDate = document.querySelector('.calendar .goToDate .inputDate'),
    goToDateButton = document.querySelector('.calendar .goToDate .goToButton'),
    addEvent = document.querySelector('.add-event'),
    addEventForm = document.querySelector('.add-event-wrapper'),
    eventWrapperOverlay = document.querySelector('.overlay'),
    closeAddEventForm = document.querySelector('.add-event-wrapper .close'),
    addEventFrom__addEventButton = document.querySelector('.add-event-wrapper .add-event-footer .add-event-btn'),
    right__day_container = document.querySelector('.right .days');

const get_event_API = "http://localhost:3000/api/get-events";
const add_event_API = "http://localhost:3000/api/add-event";

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
    addEventForm.classList.add('active');
    eventWrapperOverlay.style.visibility = 'visible';
})

closeAddEventForm.addEventListener("click", () => {
    addEventForm.classList.remove('active');
    eventWrapperOverlay.style.visibility = 'hidden';
})

function addEventToDatabase(title, start_date, end_date) {
    fetch(add_event_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            start_date: start_date,
            end_date: end_date
        })
    })
    .then(response => response.json())
    .then(() => {
        init(today, month, year);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

addEventFrom__addEventButton.addEventListener("click", () => {
    addEventForm.classList.remove('active');
    eventWrapperOverlay.style.visibility = 'hidden';
    var title = document.querySelector('input[name="title"]').value;
    var start_date = document.querySelector('input[name="start_date"]').value;
    var end_date = document.querySelector('input[name="end_date"]').value;

    addEventToDatabase(title, start_date, end_date);
    alert(title + start_date + end_date);
});