import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../Auth/auth";


const PrivateLayout = () => {
if (!isAuthenticated()) {
  return <Navigate to="users/login"  replace/>
}


  return <Outlet />;
};

export default PrivateLayout;