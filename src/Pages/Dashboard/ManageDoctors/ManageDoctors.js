import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)

   const {userLogout} = useContext(AuthContext)

    const {data:doctors = [], refetch, isLoading} = useQuery({ 
        queryKey: ['doctors'], 
        queryFn: async () => {
          try{
            const res = await fetch('http://localhost:5000/doctors', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('Access-Token')}`
                }
            })
            const data = await res.json()
            if(res.status === 401 || res.status === 403){
                return userLogout()
              }
            return data
          }
          catch(error){

          }
        
        }
       
    })

    const handleDeleteDoctor = (doctor) => {
        console.log(doctor)
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('Access-Token')}`
            }

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                refetch()
                toast.success(`${doctor.name} is deleted successfully`)
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      
     { 
        doctors?.length ?
        doctors.map(doctor =>  <tr key={doctor._id}>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={doctor.img} alt="" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{doctor.name}</div>
                
                </div>
              </div>
            </td>
            <td>
              {doctor.email}
              <br/>
              
            </td>
            <td>{doctor.specialty}</td>
            <th>
            <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal"  className="btn btn-danger btn-xs">Delete</label>
              
            </th>
          </tr>)
          :
          <tr><td className='text-3xl'>there is no data</td></tr>
     }
      
      
    
      
      
    </tbody>
    
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
</div>
{
    deletingDoctor && <ConfirmationModal
    title={deletingDoctor.name}
    setDeletingDoctor={setDeletingDoctor}
    modalData={deletingDoctor}
    successAction={handleDeleteDoctor}
    ></ConfirmationModal>
}
        </div>
    );
};

export default ManageDoctors;