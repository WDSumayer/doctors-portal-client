import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';

const SignUp = () => {
    const {createUser, updateUser} = useContext(AuthContext)
    const {register, handleSubmit, formState: { errors }, reset} = useForm()
    const [errorMessage, setErrorMessage] = useState('')

    const [createdUserEmail, setCreatedUserEmail] = useState('')
  const navigate = useNavigate()
    const [token] = useToken(createdUserEmail)

    useEffect(() => {
      if(token){
        toast.success('user create successfully')
        reset()
        // navigate('/')
        
      }
    }, [token,reset])


    
    const handleUserSignup = data => {
       
        setErrorMessage('')
       
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user)
            const profile = {
              displayName: data.name
            }
            updateUser(profile)
            .then(() =>{
              saveUser(data.name, data.email)
              
            }).catch(error => console.log(error))
        })
        .catch(error => {
            if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
                setErrorMessage('Email already in use')
            }
            
            console.log(error)
        })
    }


    const saveUser = (name, email) => {
      const user ={name, email}
      
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        setCreatedUserEmail(email)
        
        
        
      })
    }


    //..........nicher ( TOKEN ) code gulo sob jaygay use korar jonno custom hook er moddhe lekha hoese..........

    // const getUserToken = email => {
    //   fetch(`http://localhost:5000/jwt?email=${email}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     if(data.accessToken){
    //       localStorage.setItem('Access-Token', data.accessToken)
    //       reset()
    //     }
    //   })
    // }


    return (
        <div className='max-w-[1440px] mx-auto px-2'>
          <div className='login-form w-1/4 mx-auto border p-4'>
          <form onSubmit={handleSubmit(handleUserSignup)}>
      <p>name</p>
      <input className='w-full py-3 px-2 border mt-3' type='text' {...register("name", {required: 'name is required'})} />
      {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
        <p>email</p>
      <input className='w-full py-3 px-2 border mt-3' type='email' {...register("email", {required: 'email is required'})} />
      {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
      {
        errorMessage && <p className='text-red-500'>{errorMessage}</p>
      }
      <p>password</p>
      <input className='w-full py-3 px-2 border mt-3' type='password' {...register("password", { 
        required: 'password is required', 
        minLength: { value: 6, message: "must be at least 6 character"},
        pattern: {value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'password pattern must be strong'}
         })} />
      {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
     
      
      
      <input className='w-full btn btn-primary mt-3' type="submit" />
    </form>
          </div>
        </div>
    );
};

export default SignUp;