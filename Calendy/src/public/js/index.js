import calendarFunc from './calendar.js';
import eventFunc from './event.js';

const monthCalendar = document.querySelector('.left .calendar'),
    monthCalendar__date = document.querySelector('.calendar .date'),
    monthCalendar__goToPrevMonth_button = document.querySelector('.calendar .prev'),
    monthCalendar__goToNextMonth_button = document.querySelector('.calendar .next'),
    monthCalendar__days_container = document.querySelector('.calendar .days'),
    monthCalendar__goToDate_form = document.querySelector('.calendar .goToDate'),
    monthCalendar__goToDate_input = document.querySelector('.calendar .goToDate .monthCalendar__goToDate_input'),
    monthCalendar__goToDate_button = document.querySelector('.calendar .goToDate .goToButton'),
    monthCalendar__addEvent_button = document.querySelector('.add-event'),
    monthCalendar__addEventForm = document.querySelector('.add-event-form'),
    monthCalendar__editEventForm = document.querySelector('.edit-event-form'),
    monthCalendar__addEventForm_closeButton = document.querySelector('.add-event-form .close'),
    monthCalendar__editEventForm_closeButton = document.querySelector('.edit-event-form .close'),
    monthCalendar__addEventFrom_addButton = document.querySelector('.add-event-form .add-event-footer .add-event-btn'),
    monthCalendar__editEventForm_saveButton = document.querySelector('.edit-event-form .save-event-btn'),
    monthCalendar__editEventForm_removeButton = document.querySelector('.edit-event-form .remove-event-btn'),
    weekCalendar__days_container = document.querySelector('.right .days'),
    weekCalendar__weekEvents_container = document.querySelector('.right .events_container');

let tmpDate = new Date();
let today = tmpDate.getDate();
let month = tmpDate.getMonth();
let year = tmpDate.getFullYear();

// khoi tao event listener cho cac button
function init() {

    // chuyen den lich thang truoc hoac thang tiep theo
    monthCalendar__goToPrevMonth_button.addEventListener("click", () => {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        show(today, month, year);
    });
    
    monthCalendar__goToNextMonth_button.addEventListener("click", () => {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        show(today, month, year);
    
    });

    // nhap ngay de chuyen den lich cua thang do
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
            show(today, month, year);
    
        } else {
            alert("Invalid Date!\nInput format: mm/yyyy !");
        }
        monthCalendar__date.style.visibility = 'visible';
        monthCalendar__goToDate_form.style.visibility = 'hidden';
    });


    // cac button cho form them va sua su kien
    monthCalendar__addEvent_button.addEventListener("click", () => {
        monthCalendar__addEventForm.classList.add('active');
    })
    
    monthCalendar__addEventForm_closeButton.addEventListener("click", () => {
        monthCalendar__addEventForm.classList.remove('active');
    })
    
    monthCalendar__editEventForm_closeButton.addEventListener("click", () => {
        monthCalendar__editEventForm.classList.remove('active');
    })

    // nut them moi su kien
    monthCalendar__addEventFrom_addButton.addEventListener("click", () => {
        monthCalendar__addEventForm.classList.remove('active');
        var title = document.querySelector('input[name="title"]').value;
        var time = document.querySelector('input[name="time"]').value;
        var date = document.querySelector('input[name="date"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var type = document.querySelector('select[name="type"]').value;
        
        if (!eventFunc.checkDateInput(date)) {
            alert('Invalid Date!');
            return;
        } else if (!eventFunc.checkTimeInput(time)) {
            alert('Invalid Time!');
            return;
        }
        eventFunc.addEventToDatabase(title, time, date, description, type)
            .then(() => {
                show(today, month, year);
                alert('saved');
            })  
            .catch((error) => {
                console.error('Error:', error);
            });
    });
    
    // nut luu su kien da sua
    monthCalendar__editEventForm_saveButton.addEventListener("click", () => {
        monthCalendar__editEventForm.classList.remove('active');
        var id = monthCalendar__editEventForm.querySelector('input[name="id"]').value;
        var title = monthCalendar__editEventForm.querySelector('input[name="title"]').value;
        var time = monthCalendar__editEventForm.querySelector('input[name="time"]').value;
        var date = monthCalendar__editEventForm.querySelector('input[name="date"]').value;
        var description = monthCalendar__editEventForm.querySelector('input[name="description"]').value;
        var type = monthCalendar__editEventForm.querySelector('select[name="type"]').value;

        eventFunc.updateEventToDatabase(id, title, time, date, description, type)
            .then(() => {   
                show(today, month, year);
                alert('saved');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
    
    // nut xoa su kien
    monthCalendar__editEventForm_removeButton.addEventListener("click", () => {
        monthCalendar__editEventForm.classList.remove('active');
        var id = document.querySelector('input[name="id"]').value;
        eventFunc.removeEventFromDatabase(id)
            .then(() => {
                show(today, month, year);
                alert('removed');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    // show ket qua ra man hinh
    show(today, month, year);
}

// hien thi ra man hinh
function show(today, month, year) {
    monthCalendar__date.innerHTML = calendarFunc.getMonthDate(month, year);
    monthCalendar__days_container.innerHTML = calendarFunc.getMonthDays(today, month, year);
    weekCalendar__days_container.innerHTML = calendarFunc.getWeekDays(today, month, year);
    weekCalendar__weekEvents_container.innerHTML = eventFunc.setEventsID(month, year);
    eventFunc.getEventsList()
        .then(() => {
            calendarFunc.addDaysListener(month, year, show);
            eventFunc.addEventsListener();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

init();