import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({selectedDate}) => {
    

    const [appointment, setAppointment] = useState(null)

    const date = format(selectedDate, 'PP')
    const {data:appointmentOptions = [], refetch, isLoading} = useQuery({ 
        queryKey: ['appointmentOptions', date], 
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`)
            const data = await res.json()
            return data
        
        }
       
    })
    if(isLoading){
        return <Loading></Loading>
    }
   
    return (
        <section className='mt-5'>
            <p className='text-3xl text-primary text-center'>Available Appointments on {format(selectedDate, 'PP')}.</p>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOptions.map(appointmentOption => <AppointmentOption key={appointmentOption._id} appointmentOption={appointmentOption} setAppointment={setAppointment}></AppointmentOption>)
                }
            </div>
           {
            appointment &&  <BookingModal
            appointment={appointment}
            selectedDate={selectedDate}
            setAppointment={setAppointment}
            refetch={refetch}
        ></BookingModal>
           }
           
        </section>
    );
};

export default AvailableAppointment;