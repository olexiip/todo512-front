import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import useApi from "../../hooks/useApi.js"
import uselangLocalization from "../../hooks/langLocalization"

const Usermenu = (props) => {
    

    console.log(">>>Usermenu")
    const auth = useAuth();
    const api = useApi();
    const locale = uselangLocalization();
    const logOut = async () => {
        console.log("logOutF");
        await api.logOut();
        auth.logOutF();
    }
    //console.log(auth);


        if (props.auth==="ADMIN") {
            console.log("return adm menu");
            return (
                <div className="auth-status">
                    <NavLink to="/admin"><button>{locale.currLang.btns.admin}</button></NavLink>
                    <NavLink to="/me"><button>{auth.storedData.user.userName}</button></NavLink>
                    <button onClick={logOut}>{locale.currLang.btns.logout}</button>
                </div>
                        )
        } 
        if (props.auth==="USER") {
            console.log("return user menu");
            return (
                <div className="auth-status">
                            <NavLink to="/me"><button>{auth.storedData.user.userName}</button></NavLink>
                            
                            <button onClick={logOut}>{locale.currLang.btns.logout}</button>
                </div>
            )
        }


        console.log("return logIn menu");
        return (
            <div className="auth-status">
                    <NavLink to="/login"><button>{locale.currLang.btns.login}</button></NavLink>
                    <NavLink to="/register"><button>{locale.currLang.btns.register}</button></NavLink>
            </div>
        );

        







}
export default Usermenu;