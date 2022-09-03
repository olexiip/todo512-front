import {useAuth} from "../../hooks/useAuth.js"
import  {Navigate, useLocation, Outlet}  from "react-router-dom";

const ProtectedRouteK = ({childeren}) => {
    //console.log("start")
    const auth = useAuth();
    const location = useLocation();
    //console.log(auth.storedData)
    if (!auth?.storedData) {
        console.log("auth bad");
        return <Navigate to ="/login" state={{from:location}} replace = {true}/>
    }
    return (<Outlet />);
};
export default ProtectedRouteK;