import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const BookingModal = ({appointment, selectedDate, setAppointment, refetch}) => {
   const {name:treatment, slots} = appointment
   const {user} = useContext(AuthContext)
   const navigate = useNavigate()
  const date = format(selectedDate, 'PP');
   const handleAppointment = (e) => {
        e.preventDefault()
        const form = e.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        if(!user?.uid){
          return navigate('/login')
           
        }
        const booking = {
            appointmentDate: date ,
            treatment,
            patient: name,
            email,
            slot,
            phone
        }

        fetch('http://localhost:5000/bookings', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.acknowledged){
            setAppointment(null)
            toast.success('booking successfully')
            refetch()
          }
          else{
            toast.error(data.message)
          }

        })


        
   }
    return (
        <div>
            <input type="checkbox" id="bookingModal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="bookingModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">{treatment}</h3>
    <form onSubmit={handleAppointment} className='grid grid-cols-1 gap-3'>
    <input type="text" name='date' disabled placeholder="Type here" value={date} className="input input-bordered w-full" />
    <input type="text" name='treatment' placeholder="Type here" value={treatment} readOnly className="input input-bordered w-full" />
    <select name='slot' className="select select-bordered w-full">
 {
    slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
 }
 
</select>
    <input type="text" name='name' placeholder="name" defaultValue={user?.displayName} className="input input-bordered w-full" />
    <input type="email" name='email' placeholder="email" defaultValue={user?.email} readOnly className="input input-bordered w-full" />
    <input type="tel" name='phone' placeholder="phone" className="input input-bordered w-full" />
    <input type="submit" value='submit' placeholder="Type here" className="btn btn-primary w-full" />
    
    </form>
  </div>
</div>
        </div>
    );
};

export default BookingModal;