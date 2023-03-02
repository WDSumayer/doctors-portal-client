import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

import Loading from '../../Shared/Loading/Loading';

const MyAppment = () => {
    const { user, userLogout } = useContext(AuthContext)
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('Access-Token')}`
                }
            })
            const data = await res.json()
            if(res.status === 401 || res.status === 403){
                return userLogout()
              }
            return data;
        }
    })
if(isLoading){
    return <Loading></Loading>
}
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                                        <thead>
                        <tr>
                            <th></th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        { bookings.length ?
                        
                             bookings.map((booking, i) => 
                            <tr className={bookings.indexOf(booking) % 2 !== 0 ? 'active' : 'undefined'} key={booking._id}>
                                <th>{i+1}</th>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                            </tr>
                           
                           
                           )
                           :
                            <tr><td>there is no bookings here.</td></tr>
                        }
                        
                        
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppment;