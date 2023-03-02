import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../../Pages/Shared/Loading/Loading';

const AdminRouter = ({children}) => {
    const {user,loading,userLogout } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
   const location = useLocation()
   if(loading || isAdminLoading){
    return <Loading></Loading>
   }
   if(user && isAdmin){
       return children
}

userLogout()
// toast.error('sorry, you are logged out, because you are not admin')

return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRouter;