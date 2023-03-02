import DashboardLayout from "../../Layout/DashboardLayout";
import About from "../../Pages/About/About";
import Apointment from "../../Pages/Appointment/Apointment/Apointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppment from "../../Pages/Dashboard/MyAppment/MyAppment";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRouter from "../PrivateRoutes/AdminRouter";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";


const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");
const { default: Login } = require("../../Pages/Login/Login");

const routes = createBrowserRouter([
    {
        path: '/', element: <Main></Main>, children: [
            {
                path: '/', element: <Home></Home>
            },
            {
                path: '/login', element: <Login></Login>
            },
            {
                path: '/signup', element: <SignUp></SignUp>
            },
            {
                path: '/appointment', element: <Apointment></Apointment>
            },
            {
                path: '/about', element: <About></About>
            }

        ]
    },
    {
        path: '/myappment', element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>, children: [
            {
                path: '/myappment', element: <MyAppment></MyAppment>
            },
            {
                path: '/myappment/allusers', element: <AdminRouter><AllUsers></AllUsers></AdminRouter>
            },
            {
                path: '/myappment/addDoctor', element: <AdminRouter><AddDoctor></AddDoctor></AdminRouter>
            },
            {
                path: '/myappment/manageDoctors', element: <AdminRouter><ManageDoctors></ManageDoctors></AdminRouter>
            }
        ]
    }
])
export default routes;