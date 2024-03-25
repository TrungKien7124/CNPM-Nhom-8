import CalendarFunc from './calendar.js';

const monthCalendar = document.querySelector('.left .calendar'),
    monthCalendar__date = document.querySelector('.calendar .date'),
    monthCalendar__goToPrevMonth_button = document.querySelector('.calendar .prev'),
    monthCalendar__goToNextMonth_button = document.querySelector('.calendar .next'),
    monthCalendar__days_container = document.querySelector('.calendar .days'),
    monthCalendar__goToDate_form = document.querySelector('.calendar .goToDate'),
    monthCalendar__goToDate_input = document.querySelector('.calendar .goToDate .monthCalendar__goToDate_input'),
    monthCalendar__goToDate_button = document.querySelector('.calendar .goToDate .goToButton'),
    monthCalendar__addEvent_button = document.querySelector('.add-event'),
    monthCalendar__addEventForm = document.querySelector('.add-event-wrapper'),
    left__overlay = document.querySelector('.overlay'),
    monthCalendar__addEventForm_closeButton = document.querySelector('.add-event-wrapper .close'),
    monthCalendar__addEventFrom_addButton = document.querySelector('.add-event-wrapper .add-event-footer .add-event-btn'),
    weekCalendar__days_container = document.querySelector('.right .days');

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
    monthCalendar__date.innerHTML = CalendarFunc.getMonthDate(month, year);

    monthCalendar__days_container.innerHTML = CalendarFunc.getMonthDays(today, month, year);
    weekCalendar__days_container.innerHTML = CalendarFunc.getWeekDays(today, month, year);

    addDaysListener();
}

monthCalendar__goToPrevMonth_button.addEventListener("click", () => {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    init(today, month, year);
});

monthCalendar__goToNextMonth_button.addEventListener("click", () => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    init(today, month, year);

});

monthCalendar__date.addEventListener("click", () => {
    monthCalendar__date.style.visibility = 'hidden'; 
    monthCalendar__goToDate_form.style.visibility = 'visible';
});

monthCalendar__goToDate_button.addEventListener("click", () => {

    var newDate = monthCalendar__goToDate_input.value;
    var dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (dateRegex.test(newDate)) {
        tmp = newDate.split("/");
        month = parseInt(tmp[0]) - 1;
        year = parseInt(tmp[1]);
        init(today, month, year);
    
    } else {
        alert("Invalid Date!\nInput format: mm/yyyy !");
    }
    monthCalendar__date.style.visibility = 'visible'; 
    monthCalendar__goToDate_form.style.visibility = 'hidden';
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

monthCalendar__addEvent_button.addEventListener("click", () => {
    monthCalendar__addEventForm.classList.add('active');
    left__overlay.style.visibility = 'visible';
})

monthCalendar__addEventForm_closeButton.addEventListener("click", () => {
    monthCalendar__addEventForm.classList.remove('active');
    left__overlay.style.visibility = 'hidden';
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

monthCalendar__addEventFrom_addButton.addEventListener("click", () => {
    monthCalendar__addEventForm.classList.remove('active');
    left__overlay.style.visibility = 'hidden';
    var title = document.querySelector('input[name="title"]').value;
    var start_date = document.querySelector('input[name="start_date"]').value;
    var end_date = document.querySelector('input[name="end_date"]').value;

    addEventToDatabase(title, start_date, end_date);
    alert(title + start_date + end_date);
});