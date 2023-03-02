
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointment from '../AvailableAppointment/AvailableAppointment';

const Apointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
    return (
       <div className='max-w-[1440px] mx-auto px-2'>
          <AppointmentBanner
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          ></AppointmentBanner>
          <AvailableAppointment
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          ></AvailableAppointment>
          
       </div>
    );
};

export default Apointment;