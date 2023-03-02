import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';
import './Login.css'

const Login = () => {
    const {userLogin} = useContext(AuthContext)
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [loggedUserEmail, setLoggedUserEmail] = useState('')

    const [token] = useToken(loggedUserEmail)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';

useEffect(() => {
    if(token){
        toast.success('log in successfully')
        navigate(from, {replace: true})
    }
}, [token])

    const handleUserLogin = (data) => {
        
        userLogin(data.email, data.password)
        .then(result => {
            const user = result.user
            setLoggedUserEmail(data.email)

        })
        .catch(error => console.log(error))
    }

    return (
        <div className='max-w-[1440px] mx-auto px-2'>
          <div className='login-form w-1/4 mx-auto border p-4'>
          <form onSubmit={handleSubmit(handleUserLogin)}>
      <p>email</p>
      <input className='w-full py-3 px-2 border mt-3' type='email' {...register("email", {required: 'email is required'})} />
      {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
      <p>password</p>
      <input className='w-full py-3 px-2 border mt-3' type='password' {...register("password", { required: 'password is required', minLength: { value: 6, message: "must be at least 6 character" } })} />
      {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
      
      
      <input className='w-full btn btn-primary mt-3' type="submit" />
    </form>
          </div>
        </div>
    );
};

export default Login;