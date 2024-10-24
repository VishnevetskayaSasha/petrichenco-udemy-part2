   // подставляем 0 перед числом меньше 10 (8 => 08)
function getZerro(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
function timer(id, deadline) {
    // deadline переносим в script.js в вызов timer()
    //const deadline = "2024-12-31"; // дата не прошла - время по Гринвичу 
   //const deadline = "2024-10-01"; // дата прошла - время по Гринвичу 
   //const deadline = "December 31, 2024"; // дата не прошла - мое время 

   // определение разницы между дедлайном и текущей датой
   function getTimeRemaining(endtime) {
       let t = Date.parse(endtime) - Date.parse(new Date()); // кол-во миллисекунд в endtime - кол-во миллисекунд текущей даты
       let days;
       let hours;
       let minutes;
       let seconds;

       if (t <= 0) { // если дедлайн прошел, присвоиваем данным 0, чтобы при загрузке страницы не отображались отрицательные значения 
           days = 0;
           hours = 0;
           minutes = 0;
           seconds = 0;
       } else {
           days = Math.floor(t / (1000 * 60 * 60 * 24));
           hours = Math.floor((t / (1000 * 60 * 60)) % 24);
           minutes = Math.floor((t / (1000 * 60)) % 60);
           seconds = Math.floor((t / 1000) % 60);
       }

       return { // функция возвращает обьект в котором на основе расчетов получены отдельные данные.
           "total": t,
           "days": days,
           "hours": hours,
           "minutes": minutes,
           "seconds": seconds
       };
   }

   // функция установки таймера на странице
   function setClock(selector, endtime) {
       const timer = document.querySelector(selector);
       const days = timer.querySelector("#days");
       const hours = timer.querySelector("#hours");
       const minutes = timer.querySelector("#minutes");
       const seconds = timer.querySelector("#seconds");
       const timeInterval = setInterval(updateClock, 1000);

       updateClock(); //запускается тут, что бы не было скачков при перезагрузке страницы и она начинала действовать с момента загрузки

       function updateClock() {
           const t = getTimeRemaining(endtime);

           days.innerHTML = getZerro(t.days);
           hours.innerHTML = getZerro(t.hours);
           minutes.innerHTML = getZerro(t.minutes);
           seconds.innerHTML = getZerro(t.seconds);

           // останавливаем таймер
           if (t.total <= 0) {
               clearInterval(timeInterval);
           }
       }
   }

   setClock(id, deadline);
}

export default timer;
export {getZerro}