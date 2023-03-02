import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import Header from '../Pages/Shared/Header/Header';

const DashboardLayout = () => {
    const {user} = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                    

                </div>
                <div className="drawer-side mr-4">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-gray-100 text-base-content">

                        <li><Link to='/myappment'>My Appointments</Link></li>
                        {
                            isAdmin && <>
                                <li><Link to='/myappment/allusers'>All Users</Link></li>
                                <li><Link to='/myappment/addDoctor'>Add Doctor</Link></li>
                                <li><Link to='/myappment/manageDoctors'>Manage Doctor</Link></li>

                            </>
                        }
                        
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;