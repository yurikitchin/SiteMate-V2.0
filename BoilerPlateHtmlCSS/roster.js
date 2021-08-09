const date = new Date();

const renderCalendar = () => {
    const calendarDays = document.querySelector(".calendarDate");
    //sets date to first day of the month
  
    date.setDate(1);
    //get day will get the day on the first of the month(after date is set on divne 5)
    
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    
    const fdIndex = date.getDay();
  
    
    const ldIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  
    let nextMonthDays = 7
    const NMD = () => {
    if (ldIndex !== 6) {
        7 - (ldIndex + 1);
    }
        
    console.log("ldIndex = ", ldIndex);
    console.log("nextMonthDays = ", nextMonthDays);
    } 

    const months = [
      "January",
      "Febuary",
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
    ];
    
    document.querySelector(".monthYear").innerHTML =
      months[date.getMonth()] + " " + date.getFullYear();
    
    let days = "";
    
    // sets the number of days in the week the previous month takes
    for (let x = fdIndex; x > 0; x--) {
      days += `<div class="prevDate">${prevLastDay - x + 1}</div>`;
    }
    
    //sets number of days in the month
    for (let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }
    //sets number of days in the week the next month takes up
    for (let j = 1; j <= nextMonthDays; j++) {
      days += `<div class="nextDate">${j}</div>`;
      calendarDays.innerHTML = days;
    }
}


document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() -1);
    renderCalendar()
})

document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() +1);
    renderCalendar()
})

renderCalendar()