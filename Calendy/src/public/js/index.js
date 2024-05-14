import CalendarFunc from './calendar.js';
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
    left__overlay = document.querySelector('.overlay'),
    monthCalendar__addEventForm_closeButton = document.querySelector('.add-event-form .close'),
    monthCalendar__editEventForm_closeButton = document.querySelector('.edit-event-form .close'),
    monthCalendar__addEventFrom_addButton = document.querySelector('.add-event-form .add-event-footer .add-event-btn'),
    monthCalendar__editEventForm_saveButton = document.querySelector('.edit-event-form .save-event-btn'),
    monthCalendar__editEventForm_removeButton = document.querySelector('.edit-event-form .remove-event-btn'),
    weekCalendar__days_container = document.querySelector('.right .days'),
    weekCalendar__weekEvents_container = document.querySelector('.right .events_container');
    

const get_event_API = "http://localhost:3000/api/get-events";
const add_event_API = "http://localhost:3000/api/add-event";
const delete_event_API = "http://localhost:3000/api/delete-event";
const update_event_API = "http://localhost:3000/api/update-event";

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
    weekCalendar__weekEvents_container.innerHTML = eventFunc.setEventsID(month, year);
    eventFunc.getEventsList()
        .then(() => {
            addDaysListener();
            addEventsListener();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
                init(e.innerText, month, year);
            })
        }
    );
}

monthCalendar__addEvent_button.addEventListener("click", () => {
    monthCalendar__addEventForm.classList.add('active');
})

monthCalendar__addEventForm_closeButton.addEventListener("click", () => {
    monthCalendar__addEventForm.classList.remove('active');
})

monthCalendar__editEventForm_closeButton.addEventListener("click", () => {
    monthCalendar__editEventForm.classList.remove('active');
})

function addEventToDatabase(title, date, description) {
    fetch(add_event_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            date: date,
            description: description
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

function updateEventToDatabase(id, title, date, description) {
    fetch(update_event_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            title: title,
            date: date,
            description: description
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

function removeEventFromDatabase(id) {
    fetch(delete_event_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
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
    var title = document.querySelector('input[name="title"]').value;
    var date = document.querySelector('input[name="date"]').value;
    var description = document.querySelector('input[name="description"]').value;

    addEventToDatabase(title, date, description);
    alert('added');
});

monthCalendar__editEventForm_saveButton.addEventListener("click", () => {
    monthCalendar__editEventForm.classList.remove('active');
    var id = monthCalendar__editEventForm.querySelector('input[name="id"]').value;
    var title = monthCalendar__editEventForm.querySelector('input[name="title"]').value;
    var date = monthCalendar__editEventForm.querySelector('input[name="date"]').value;
    var description = monthCalendar__editEventForm.querySelector('input[name="description"]').value;

    updateEventToDatabase(id, title, date, description);
    alert('updated');
});

monthCalendar__editEventForm_removeButton.addEventListener("click", () => {
    monthCalendar__editEventForm.classList.remove('active');
    var id = document.querySelector('input[name="id"]').value;
    removeEventFromDatabase(id);
    alert('removed');
});

function addEventsListener() {
    document.querySelectorAll('.right .events .event').forEach(
        (e) => {
            e.addEventListener("click", () => {
                monthCalendar__editEventForm.querySelector('.event-id').value = e.querySelector('.id').textContent;
                monthCalendar__editEventForm.querySelector('.event-name').value = e.querySelector('.title').textContent;
                monthCalendar__editEventForm.querySelector('.event-date').value = e.querySelector('.date').textContent;
                monthCalendar__editEventForm.querySelector('.event-description').value = e.querySelector('.description').textContent;
                monthCalendar__editEventForm.classList.add('active');
            })
        }
    );
}

function createCheckboxes() {
    var checkboxContainer = document.getElementById("checkboxContainer");
    checkboxContainer.innerHTML = ""; // Clear previous content

    
    checkboxNames.forEach(function(name, index) {
        var checkboxDiv = document.createElement("div");
        
        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = "checkbox" + (index + 1);

        var deleteButton = document.createElement("button");
        
        
        deleteButton.addEventListener("click", function() {
            checkboxNames.splice(index, 1);
            createCheckboxes();
        });
        deleteButton.style.position = "absolute";
        
        deleteButton.style.right = "20px";

        var deleteIcon = document.createElement("img");
        deleteIcon.src = "https://banner2.cleanpng.com/20191230/weo/transparent-trash-icon-bin-icon-pollution-icon-5e0a20e261c162.5470446815777220824004.jpg";
        deleteIcon.style.width = "20px"; 
        deleteIcon.style.height = "20px"; 
        deleteButton.appendChild(deleteIcon);
        

        var label = document.createElement("label");
        label.htmlFor = "checkbox" + (index + 1);
        label.appendChild(document.createTextNode(name));
        
        label.style.fontWeight = "bold";
        

        checkboxDiv.appendChild(input);
        checkboxDiv.appendChild(label);
        checkboxDiv.appendChild(deleteButton);
        checkboxDiv.appendChild(document.createElement("br"));

        checkboxContainer.appendChild(checkboxDiv);

        checkboxDiv.style.marginBottom = "10px"; 
    });
}

var checkboxNames = []; 

document.getElementById("toggleButton").addEventListener("click", function() {
    var checkboxContainer = document.getElementById("checkboxContainer");
    if (checkboxContainer.style.display === "none") {
        createCheckboxes();
        checkboxContainer.style.display = "block";
        this.textContent = "My Event";
    } else {
        checkboxContainer.style.display = "none";
        this.textContent = "Show Event";
    }
});



document.getElementById("addButton").addEventListener("click", function() {
    var eventInputContainer = document.getElementById("eventInputContainer");
    var check = 0;
    if(check === 0 && eventInputContainer.style.display === "none") {
        eventInputContainer.style.display = "block";
        check = 1;
    }
    if(check === 0 && eventInputContainer.style.display === "block") {
        eventInputContainer.style.display = "none";
    }
    
    
    
});

document.getElementById("confirmEventButton").addEventListener("click", function() {
    var newEventName = document.getElementById("newEventName").value;
    if (newEventName.trim() !== "") {
        var x = " " + " " + newEventName;
        checkboxNames.push(x);
        createCheckboxes();
        
        console.log("Thêm sự kiện mới:", newEventName);
        document.getElementById("newEventName").value = ""; 
        var eventInputContainer = document.getElementById("eventInputContainer");
        eventInputContainer.style.display = "none"; 
    }
});






