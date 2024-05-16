const get_event_API = "http://localhost:3000/api/get-events";
const add_event_API = "http://localhost:3000/api/add-event";
const delete_event_API = "http://localhost:3000/api/delete-event";
const update_event_API = "http://localhost:3000/api/update-event";


let eventFunc = {
    checkTimeInput: function (time) {
        return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
    },

    checkDateInput: function (dateString) {

        let regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        if (!regex.test(dateString)) return false;

        let [, day, month, year] = dateString.match(regex);

        day = parseInt(day, 10);
        month = parseInt(month, 10) - 1;
        year = parseInt(year, 10);

        let date = new Date(year, month, day);

        return (
            date.getDate() === day &&
            date.getMonth() === month &&
            date.getFullYear() === year
        );
    },

    showEvents: function (eventsList, event_date) {
        let res = [];
        event_date = event_date.replace(/-/g, '/');
        for (let i = 0; i < eventsList.length; i++) {
            console.log(eventsList[i].start_date);
            if (this.dateComparing(eventsList[i].date, event_date)) {
                res.push(eventsList[i]);
            }
        }
        let colorMap = {
            'work': '#006ff9',
            'education': '#ffcc00',
            'personal': '#ff5630',
        };
        res.sort(this.timeComparing);
        return res.map((item) => `<div class='event'>
                            <div class='type' style='background-color: ${colorMap[item.type]}'>${item.type}</div>
                            <div class='id' style="display: none;">${item.id}</div>
                            <div class='title'>${item.title}</div>
                            <div class='time'>${item.time}</div>
                            <div class='date' style="display: none;">${item.date}</div>
                            <div class='description' style="display: none;">${item.description}</div>
                        </div>`).join('');
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

    getEventsList(userId) {
        return new Promise((resolve, reject) => {
          this.getEventsByUserId(userId)
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

    timeComparing: function (a, b) {
        let tmp1 = a.time.split(':').map(e => parseInt(e));
        let tmp2 = b.time.split(':').map(e => parseInt(e));
        if (tmp1[0] == tmp2[0]) {
            return tmp1[1] - tmp2[1];
        }
        return tmp1[0] - tmp2[0];
    },

    addEventToDatabase: function (title, time, date, description, type) {
        return new Promise((resolve, reject) => {
            fetch(add_event_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    time: time,
                    date: date,
                    description: description,
                    type: type
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

    updateEventToDatabase: function (id, title, time, date, description, type) {
        return new Promise((resolve, reject) => {
            fetch(update_event_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    time: time,
                    date: date,
                    description: description,
                    type: type
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

    addEventsListener: function () {
        const monthCalendar__editEventForm = document.querySelector('.edit-event-form');
        document.querySelectorAll('.right .events .event').forEach(
            (e) => {
                e.addEventListener("click", () => {
                    monthCalendar__editEventForm.querySelector('.event-id').value = e.querySelector('.id').textContent;
                    monthCalendar__editEventForm.querySelector('.event-name').value = e.querySelector('.title').textContent;
                    monthCalendar__editEventForm.querySelector('.event-time').value = e.querySelector('.time').textContent;
                    monthCalendar__editEventForm.querySelector('.event-date').value = e.querySelector('.date').textContent;
                    monthCalendar__editEventForm.querySelector('.event-description').value = e.querySelector('.description').textContent;
                    monthCalendar__editEventForm.querySelector('select').value = e.querySelector('.type').textContent;
                    monthCalendar__editEventForm.classList.add('active');
                })
            }
        );
    },

getEventsByUserId(userId) {
    return new Promise((resolve, reject) => {
      fetch(`${get_event_API}?userId='${userId}'`)
        .then(response => response.json())
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  }
};

export default eventFunc;