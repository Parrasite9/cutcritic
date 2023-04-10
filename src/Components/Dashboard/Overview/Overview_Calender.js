import React from 'react'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect } from 'react';
import { useState } from 'react';

function Overview_Calender() {

    // THIS HOOK AND USEEFFECT IS TO UPDATE THE PAGE EVERY MINUTE AND GET 
    // THE CURRENT DATE. THIS WILL HELP THE CALENDER STAY ACCURATE 

    const [currentDate, setCurrentDate] = useState(dayjs())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date())
        }, 60000)
        return () => clearInterval(intervalId)
    }, [])

    const dateNow = dayjs()

  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar date={currentDate} />
        </LocalizationProvider>
    </div>
  )
}

export default Overview_Calender
