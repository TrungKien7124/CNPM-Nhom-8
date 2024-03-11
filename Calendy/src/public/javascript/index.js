const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.calendar .date'),
    prevButton = document.querySelector('.calendar .prev'),
    nextButton = document.querySelector('.calendar .next'),
    daysContainer = document.querySelector('.calendar .days'),
    goToDateForm = document.querySelector('.calendar .goToDate'),
    inputDate = document.querySelector('.calendar .goToDate .inputDate'),
    goToDateButton = document.querySelector('.calendar .goToDate .goToButton'),
    eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector('.event-date'),
    addEvent = document.querySelector('.add-event'),
    addEventWrapper = document.querySelector('.add-event-wrapper');

let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

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

function init() {
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);
    let prevMonthLastDay = new Date(year, month, 0);
    
    // show date
    date.innerHTML = months[month] + ' ' + year; 

    let days = "";
    
    //show last month days
    var tmp = prevMonthLastDay.getDay();
    if (tmp == 0) tmp = 7;
    for (var i = 1, tmpDate = prevMonthLastDay.getDate(); i <= tmp; i++) {
        days += `<div class="day prev-month">${tmpDate - tmp + i}</div>`;
    }

    //show current month days
    for (var i = 1, n = lastDay.getDate(), currDay = today.getDate(); i <= n; i++) {
        if (i == currDay) {
            days += `<div class="day today active">${i}</div>`;
        } else {
            days += `<div class="day ">${i}</div>`;
        }
    }

    //show next month days
    for (var i = lastDay.getDay() + 1, tmpDate = 1; i <= 7 && i != 1; i++) {
        days += `<div class="day next-month">${tmpDate++}</div>`;
    }

    daysContainer.innerHTML = days;
    addDaysListener();
    getEventDate();
}

prevButton.addEventListener("click", () => {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    init();
});

nextButton.addEventListener("click", () => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    init();

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
        init();
    
    } else {
        alert("Invalid Date!\nInput format: mm/yyyy !");
    }
    date.style.visibility = 'visible'; 
    goToDateForm.style.visibility = 'hidden';
});

init();

function addDaysListener() {
    document.querySelectorAll('.day:not(.prev-month, .next-month)').forEach(
        (e) => {
            e.addEventListener("click", () => {
                document.querySelector('.day.active').classList.remove('active');
                e.classList.add('active');
                getEventDate();
            })
        }
    );
}

function getEventDate() {
    var tmp = document.querySelector('.day.active');
    var curr = new Date(year, month, tmp.innerHTML);
    currDay = curr.getDay();
    eventDay.innerHTML = weekdays[(currDay == 0 ? 6 : --currDay)];
    eventDate.innerHTML = curr.getDate() + '/' + (curr.getMonth() + 1) + '/' + curr.getFullYear();
}

addEvent.addEventListener("click", () => {
    addEventWrapper.classList.toggle('active');
})