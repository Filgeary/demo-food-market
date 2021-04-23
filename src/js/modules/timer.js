import { getZero } from '../utils/getZero';

function timer(selector, deadline) {
    function getTimeRemaining(endtime) {
        const now = new Date();
        let timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
        let totalTimestamp = 0;

        if (timezoneOffset < 0) {
            timezoneOffset = Math.abs(timezoneOffset);
            totalTimestamp = Date.parse(endtime) - Date.now() - timezoneOffset;
        } else if (timezoneOffset > 0) {
            totalTimestamp = Date.parse(endtime) - Date.now() + timezoneOffset;
        } else {
            totalTimestamp = Date.parse(endtime) - Date.now();
        }

        const days = Math.floor(totalTimestamp / (1000 * 60 * 60 * 24)),
            hours = Math.floor((totalTimestamp / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((totalTimestamp / (1000 * 60)) % 60),
            seconds = Math.floor((totalTimestamp / 1000) % 60);

        return {
            total: totalTimestamp,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const total = getTimeRemaining(endtime);

            days.innerHTML = getZero(total.days);
            hours.innerHTML = getZero(total.hours);
            minutes.innerHTML = getZero(total.minutes);
            seconds.innerHTML = getZero(total.seconds);

            if (total.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(selector, deadline);
}

export default timer;
