import React from 'react';

const AppointmentOption = ({appointmentOption,setAppointment}) => {
    const {name, slots} = appointmentOption;
    return (
        <div>
            <div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{slots.length > 0 ? slots[0] : 'try another day'}</p>
    <p>{slots.length} {slots.length > 1 ? 'spaces are' : 'space is'} available</p>
    <div className="card-actions justify-end">
      
      <label disabled={slots.length === 0} onClick={() => setAppointment(appointmentOption)} className="btn btn-primary" htmlFor="bookingModal">Book Appointment</label>
      
    </div>
  </div>
</div>
        </div>
    );
};

export default AppointmentOption;