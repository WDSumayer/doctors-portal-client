import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AddDoctor = () => {
    const {userLogout} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    // const [errorMessage, setErrorMessage] = useState('')
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    console.log(imageHostKey)
    const {data:specialties = [] } = useQuery({ 
        queryKey: ['specialties'], 
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/specialties')
            const data = await res.json()
           
            return data
        
        }
       
    })
 const navigate = useNavigate()


    const handleAddDoctor = data => {
        console.log(data)
        const image = data.image[0]
        console.log(image)
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
  method: 'POST',
  body: formData,
})
  .then((res) => res.json())
  .then((imgData) => {
    console.log('Success:', imgData);
    if(imgData.success){
        const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img: imgData.data.url
        }

        fetch('http://localhost:5000/doctors', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('Access-Token')}`

            },
            body: JSON.stringify(doctor)
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
                return userLogout()
              }

            return res.json()
        })
        .then(result => {
            console.log(result)
            if(result?.acknowledged){

                toast.success(`${data.name} is added successfully`)
                navigate('/myappment/manageDoctors')

            }
        })
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    }

    return (
        <div className='w-96 mx-auto'>
            <h1>Add a doctor</h1>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <p>name</p>
                <input className='w-full py-3 px-2 border mt-3' type='text' {...register("name", { required: 'name is required' })} />
                {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                <p>email</p>
                <input className='w-full py-3 px-2 border mt-3' type='email' {...register("email", { required: 'email is required' })} />
                {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                {/* {
                    errorMessage && <p className='text-red-500'>{errorMessage}</p>
                } */}
                <p>Specialty</p>
                <select className="select select-bordered rounded-none mt-3 w-full" {...register("specialty")}>
                    {
                        specialties.map(specialty =>  <option key={specialty._id} value={specialty.name}>{specialty.name}</option> )
                    }
                    
                </select>
                <p>Photo</p>
                <input className='w-full py-3 px-2 border mt-3' type='file' {...register("image", { required: 'image is required' })} />
                {errors.image && <p className='text-red-500'>{errors.image?.message}</p>}
                {/* {
                    errorMessage && <p className='text-red-500'>{errorMessage}</p>
                } */}



                <input className='w-full btn btn-primary mt-3' type="submit" value='Add Doctor' />
            </form>
        </div>
    );
};

export default AddDoctor;