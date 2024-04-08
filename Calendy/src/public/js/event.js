const get_event_API = "http://localhost:3000/api/get-events";

function setEventsID(month, year) {
    let events = '';
    let lastMonth = new Date(year, month - 1, 0);
    let nextMonth = new Date(year, month + 1, 0);
    document.querySelectorAll('.week-calendar .day').forEach((e) => {
        if (e.classList.contains('prev-month')) {
            events += `<div class='events' id='${e.innerText}-${lastMonth.getMonth() + 1}-${lastMonth.getFullYear()}'></div>`;
        } else if (e.classList.contains('next-month')) {
            events += `<div class='events' id='${e.innerText}-${nextMonth.getMonth() + 1}-${nextMonth.getFullYear()}'></div>`;
        } else {
            events += `<div class='events' id='${e.innerText}-${month + 1}-${year}'></div>`;
        }
    });
    return events;
}
function getEventsList(array) {
    fetch(get_event_API)
    .then(response => response.json())
    .then((response) => {
        console.log(response);
        array.forEach((e) => {
            e.innerHTML = showEvents(response, e.id);
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showEvents(eventsList, event_date) { 
    let res = '';
    event_date = event_date.replace(/-/g, '/');
    for (let i = 0; i < eventsList.length; i++) {
        console.log(eventsList[i].start_date);
        if (eventsList[i].start_date == event_date) {
            res += `<div class='event'>${eventsList[i].title}</div>`;
        }
    }
    return res;
}

const eventFunc = {
    setEventsID,
    getEventsList,
}

export default eventFunc;