import React, { useEffect, useState } from 'react'
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'
import './Calendar.css'

function Calendar() {
   const [monthDays, setMonthDays] = useState([])
   const currDate = {
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
   }
   const [month, setMonth] = useState(currDate.month)
   const [year, setYear] = useState(currDate.year)

   const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ]
   const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
   ]
   const nextMonth = () => {
      if (month === 11) {
         setYear(year + 1)
         setMonth(0)
      } else {
         setMonth(month + 1)
      }
   }
   const prevMonth = () => {
      if (month === 0) {
         setYear(year - 1)
         setMonth(11)
      } else {
         setMonth(month - 1)
      }
   }
   const nextYear = () => {
      setYear(year + 1)
   }
   const prevYear = () => {
      setYear(year - 1)
   }

   useEffect(() => {
      const generateCalendar = (year, month) => {
         const firstDay = new Date(year, month, 1).getDay()
         const currMonth = new Date(year, month + 1, 0)
         const lastDay = currMonth.getDate()
         const remDay = 6 - currMonth.getDay()

         const totalDays = firstDay + lastDay + remDay

         const monthDays = []
         let week = []

         for (let val = 1; val <= totalDays; val++) {
            let obj = {}
            if (val > firstDay && val <= totalDays - remDay) {
               obj.dateString = new Date(year, month, val - firstDay).toString()
               obj.date = val - firstDay
               week.push(obj)
            } else {
               obj.dateString = null
               obj.date = null
               week.push(obj)
            }
            if (val % 7 === 0) {
               monthDays.push(week)
               week = []
            }
         }

         setMonthDays(monthDays)
      }
      generateCalendar(year, month)
   }, [year, month])

   return (
      <div className="calendar-container">
         <div className="current-date">
            <div className="current__year">
               <button className="calendar__btn" onClick={prevYear}>
                  <AiFillCaretLeft />
               </button>
               <p className="year__body">{year}</p>
               <button className="calendar__btn" onClick={nextYear}>
                  <AiFillCaretRight />
               </button>
            </div>
            <div className="current__month">
               <button className="calendar__btn" onClick={prevMonth}>
                  <AiFillCaretLeft />
               </button>
               <p className="month__body">{months[month]}</p>
               <button className="calendar__btn" onClick={nextMonth}>
                  <AiFillCaretRight />
               </button>
            </div>
         </div>
         <table className="current-month">
            <thead>
               <tr>
                  {weekdays.map((ele, index) => {
                     let shortele = ele.substring(0, 3).toUpperCase()
                     return (
                        <th key={index} className="table__head">
                           {shortele}
                        </th>
                     )
                  })}
               </tr>
            </thead>
            <tbody>
               {monthDays.map((row, index) => {
                  return (
                     <tr key={index}>
                        {row.map((ele, index) => {
                           let dt = new Date(
                              currDate.year,
                              currDate.month,
                              currDate.date
                           ).toString()
                           return (
                              <td key={index} className="table__data">
                                 <p
                                    className={
                                       ele.dateString === dt
                                          ? 'month__days active'
                                          : 'month__days'
                                    }>
                                    {ele.date}
                                 </p>
                              </td>
                           )
                        })}
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
   )
}

export default Calendar
