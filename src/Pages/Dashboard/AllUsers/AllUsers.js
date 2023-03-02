import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';

const AllUsers = () => {
   const{userLogout} = useContext(AuthContext)
    const {data:users = [], refetch} = useQuery({ 
        queryKey: ['users'], 
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users', {
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
       
    })


    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('Access-Token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            refetch()
        })
    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                                        <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.length ?
                        
                             users.map((user, i) => 
                            <tr className={users.indexOf(user) % 2 !== 0 ? "active" : 'undefined'} key={user._id}>
                                <th>{i+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{
                                        !user?.role  &&
                                       
        
                                        <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make admin</button>
                                        
                                    }</td>
                                <td><button className='btn btn-xs btn-danger'>Delete</button></td>
                                
                            </tr>
                           
                           
                           )
                           :
                            <tr><th className='text-2xl'>there is no user</th></tr>
                        }
                        
                        
                      
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;