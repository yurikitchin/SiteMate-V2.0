const date = new Date()
const month = date.getMonth()
const calendarDays = document.querySelector('.calendarDate')
//sets date to first day of the month
date.setDate(1)
//get day will get the day on the first of the month(after date is set on line 5)
console.log(date.getDay())

const lastDay = new Date(date.getFullYear(), date.getMonth(),0, 1)
console.log(lastDay)
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
]

document.querySelector('.monthYear').innerHTML = months[date.getMonth()]  + " " + date.getFullYear()

let days = "";

for (let i = 0; i < lastDay; i++) {
    days += `<li>${i}</li>`;
    calendarDays.innerHTML = days;
    
}