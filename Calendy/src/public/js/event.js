const get_event_API = "http://localhost:3000/api/get-events";
const add_event_API = "http://localhost:3000/api/add-event";
const delete_event_API = "http://localhost:3000/api/delete-event";
const update_event_API = "http://localhost:3000/api/update-event";


let eventFunc = {
    showEvents: function (eventsList, event_date) {
        let res = '';
        event_date = event_date.replace(/-/g, '/');
        for (let i = 0; i < eventsList.length; i++) {
            console.log(eventsList[i].start_date);
            if (this.dateComparing(eventsList[i].date, event_date)) {
                res += `<div class='event'>
                            <div class='id' style="display: none;">${eventsList[i].id}</div>
                            <div class='title'>${eventsList[i].title}</div>
                            <div class='date' style="display: none;">${eventsList[i].date}</div>
                            <div class='description' style="display: none;">${eventsList[i].description}</div>
                        </div>`;
            }
        }
        return res;
    },

    setEventsID: function (month, year) {
        let events = '';
        let lastYear = month - 1 < 0 ? year - 1 : year;
        let nextYear = month + 1 > 11 ? year + 1 : year;
        let lastMonth = month - 1 < 0 ? 11 : month - 1;
        let nextMonth = month + 1 > 11 ? 0 : month + 1;
        document.querySelectorAll('.week-calendar .day').forEach((e) => {
            if (e.classList.contains('prev-month')) {
                events += `<div class='events' id='${e.innerText}-${lastMonth + 1}-${lastYear}'></div>`;
            } else if (e.classList.contains('next-month')) {
                events += `<div class='events' id='${e.innerText}-${nextMonth + 1}-${nextYear}'></div>`;
            } else {
                events += `<div class='events' id='${e.innerText}-${month + 1}-${year}'></div>`;
            }
        });
        return events;
    },

    getEventsList: function () {
        return new Promise((resolve, reject) => {
            fetch(get_event_API)
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                    document.querySelectorAll('.right .events').forEach((e) => {
                        e.innerHTML = this.showEvents(response, e.id);
                    })
                    resolve();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    },

    dateComparing: function (a, b) {
        let tmp1 = a.split('/').map(e => parseInt(e));
        let tmp2 = b.split('/').map(e => parseInt(e));
        for (var i = 0; i < 3; i++) {
            if (tmp1[i] != tmp2[i]) {
                return false;
            }
        }
        return true;
    },

    addEventToDatabase: function (title, date, description) {
        return new Promise((resolve, reject) => {
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
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });       
    },

    updateEventToDatabase: function (id, title, date, description) {
        return new Promise((resolve, reject) => {
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
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    },

    removeEventFromDatabase: function (id) {
        return new Promise((resolve, reject) => {
            fetch(delete_event_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            })
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    },

    addEventsListener: function() {
        const monthCalendar__editEventForm = document.querySelector('.edit-event-form');
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
};

export default eventFunc;