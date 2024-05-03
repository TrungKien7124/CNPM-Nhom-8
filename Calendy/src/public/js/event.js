const get_event_API = "http://localhost:3000/api/get-events";

let eventFunc = {
    showEvents: function (eventsList, event_date) {
        let res = '';
        event_date = event_date.replace(/-/g, '/');
        for (let i = 0; i < eventsList.length; i++) {
            console.log(eventsList[i].start_date);
            if (this.dateComparing(eventsList[i].start_date, event_date)) {
                res += `<div class='event'>
                            <div class='id' style="display: none;">${eventsList[i].id}</div>
                            <div class='title'>${eventsList[i].title}</div>
                            <div class='date' style="display: none;">${eventsList[i].start_date}</div>
                        </div>`;
            }
        }
        return res;
    },

    setEventsID: function (month, year) {
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
    }
};

export default eventFunc;