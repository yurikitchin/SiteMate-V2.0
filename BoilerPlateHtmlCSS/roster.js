const date = new Date()
const month = date.getMonth()
const calendarDays = document.querySelector('.calendarDate')

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