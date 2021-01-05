/*Создай плагин настраиваемого таймера, который ведет обратный отсчет 
до предварительно определенной даты. Такой плагин может использоваться 
в блогах и интернет-магазинах, страницах регистрации событий, во время 
технического обслуживания и т. д.

Плагин ожидает следующую HTML-разметку и показывает четыре цифры: 
дни, часы, минуты и секунды в формате XX:XX:XX:XX. 
Количество дней может состоять из более чем двух цифр. */

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */

const refs = {
  //timerRef: document.querySelector('div #timer-1'),
  daysSpan: document.querySelector('span[data-value="days"]'),
  hoursSpan: document.querySelector('span[data-value="hours"]'),
  minsSpan: document.querySelector('span[data-value="mins"]'),
  secsSpan: document.querySelector('span[data-value="secs"]'),
};

const timeinterval = setInterval(updateClock, 1000);

class CountdownTimer {
  constructor(params = {}) {
    this.selector = params.selector;
    this.targetDate = params.targetDate;
  }

  getTimeRemaining() {
    const time = Date.parse(this.targetDate) - Date.parse(new Date());
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    if (Date.parse(this.targetDate) <= Date.parse(new Date())) {
      clearInterval(timeinterval);
    }

    return {
      days: days,
      hours: hours,
      minutes: mins,
      seconds: secs,
    };
  }
  /*setTimer() {
    const timer = this.selector;
    return timer;
  }*/
}

const AlexBirthday = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Apr 5, 2021'),
});

function updateClock() {
  const time = AlexBirthday.getTimeRemaining();

  if (time.days >= 0) {
    if (time.days < 100) {
      refs.daysSpan.innerHTML = ('0' + time.days).slice(-2);
    } else {
      refs.daysSpan.innerHTML = ('0' + time.days).slice(-3);
    }
    refs.hoursSpan.innerHTML = ('0' + time.hours).slice(-2);
    refs.minsSpan.innerHTML = ('0' + time.minutes).slice(-2);
    refs.secsSpan.innerHTML = ('0' + time.seconds).slice(-2);
  } else {
    refs.daysSpan.innerHTML = '00';
    refs.hoursSpan.innerHTML = '00';
    refs.minsSpan.innerHTML = '00';
    refs.secsSpan.innerHTML = '00';
  }
}

updateClock();
