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

function getMonthDate(month, year) {
    return months[month] + ' ' + year;
}

function getMonthDays(day, month, year) {
    let today = new Date(year, month, day);
    let firstDay = new Date(year, month, 1);
    let lastDay = new Date(year, month + 1, 0);
    let prevMonthLastDay = new Date(year, month, 0);
    let days = "";
    
    //show last month days
    var tmp = prevMonthLastDay.getDay();
    if (tmp == 0) tmp = 7;
    for (var i = 1, tmpDate = prevMonthLastDay.getDate(); i <= tmp; i++) {
        days += `<div class="day prev-month"><div>${tmpDate - tmp + i}</div></div>`;
    }

    //show current month days
    for (var i = 1, n = lastDay.getDate(), currDay = today.getDate(); i <= n; i++) {
        if (i == currDay) {
            days += `<div class="day today active"><div>${i}</div></div>`;
        } else {
            days += `<div class="day "><div>${i}</div></div>`;
        }
    }

    //show next month days
    for (var i = lastDay.getDay() + 1, tmpDate = 1; i <= 7 && i != 1; i++) {
        days += `<div class="day next-month"><div>${tmpDate++}</div></div>`;
    }

    return days;
}

function getWeekDays(day, month, year) {
    let today = new Date(year, month, day);
    let weekday = today.getDay() == 0 ? 7 : today.getDay();
    let lastDay = new Date(year, month + 1, 0);
    let firstDay = new Date(year, month, 1);
    let prevMonthLastDay = (new Date(year, month, 0)).getDate();

    let days = "";

    // bao gom ca ngay cua thang truoc
    if (today.getDate() - firstDay.getDate() < weekday - 1) {
        var lastMonthDays = firstDay.getDay() - 1;
        for (var i = 1; i <= lastMonthDays; i++) {
            days += `<div class='day prev-month'>${prevMonthLastDay - lastMonthDays + i}</div>`;
        }
        for (var i = (firstDay.getDay() == 0 ? 7:firstDay.getDay()), tmp = 1; i <= 7; i++) {
            if (tmp == today.getDate()) {
                days += `<div class='day active'>${tmp++}</div>`;
            } else{
                days += `<div class='day'>${tmp++}</div>`;
            }
        }
    } 
    // bao gom ca ngay cua thang sau
    else if (lastDay.getDate() - today.getDate() < 7 - weekday) {
        var nextMonthDays = 7 - lastDay.getDay();
        for (var i = 1, tmp = today.getDate() - weekday + 1; i <= (lastDay.getDay() == 0 ? 7:lastDay.getDay()); i++) {
            if (tmp == today.getDate()) {
                days += `<div class='day active'>${tmp++}</div>`;
            } else{
                days += `<div class='day'>${tmp++}</div>`;
            }
        }   
        for (var i = (lastDay.getDay() == 0 ? 7:lastDay.getDay()) + 1, tmp = 1; i <= 7; i++) {
            days += `<div class='day next-month'>${tmp++}</div>`;
        }
    }
    // chi bao gom ngay cua thang hien tai
    else {
        for (var i = 1, tmp = today.getDate() - weekday + 1; i <= 7; i++) {
            if (tmp == today.getDate()) {
                days += `<div class='day active'>${tmp++}</div>`;
            } else{
                days += `<div class='day'>${tmp++}</div>`;
            }
        }
    }

    return days;
}

const CalendarFunc = {
    getMonthDate,
    getMonthDays,
    getWeekDays
}

export default CalendarFunc;