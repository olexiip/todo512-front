import {useAuth} from "../../hooks/useAuth.js"
import  {Navigate, useLocation, Outlet}  from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRouteAdmin = () => {
    //console.log("start")
    const [currState, newState] = useState(false);
    const auth = useAuth();
    const location = useLocation();

    if (auth?.storedData?.user?.roles.indexOf("ADMIN")>-1) {
        return (<Outlet />);
    }
    return <Navigate to ="/home" state={{from:location}} replace = {true}/>   
};
export default ProtectedRouteAdmin;