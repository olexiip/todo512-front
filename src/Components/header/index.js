
import UserMenu from "../userMenu/userMenu.js"
import { NavLink, Outlet } from "react-router-dom";
import useApi from "../../hooks/useApi.js"
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
//import "./styles.css"





const Layout = () => {

console.log(">>>Header");

    const [state, updateState] = useState("LOADING...");
    const auth = useAuth();
    const api = useApi();

    //console.log("Usermenu")

    const check = async () => {
        console.log("start check auth")
        if (!auth?.storedData?.accesToken) {
            console.log("LS empty > return login")
            return "LOGIN";
        }
        console.log("start check auth with back end")
        const checkRes = await api.check();
        if(checkRes.data.res==="ok"){
            console.log("auth ok")
        }
        return checkRes.data;
    }

    const menu = () => {

        if (auth?.storedData?.user?.roles.indexOf("ADMIN")>-1) {
            //console.log("LS ADMIN");
            return "ADMIN"
        } 
        if (auth?.storedData?.user) {
            //console.log("LS USER");
            return "USER"
        }
        //console.log("LS EMPTY");
        return "LOGIN";
    }

    const update = () =>{
        const newMenu = menu();
        updateState(newMenu);
    }
    const logOute2 = () => {
        console.log("check auth return error, >>> do logOute");
        auth.logOutF();
        console.log("logOute2 -----");
        //console.log(auth.storedData);
        update();
    }
    
    
    useEffect(()=>{
        check().then(update).catch(logOute2);
    },[])


    //return state;
    if (state === "LOADING...") {
        console.log("return LOADING...");
        return (state);
    }
    if (state !== "LOADING...") {
        console.log("return normal page");
    }

    const changelang = () => {
        //console.log("changelang ------------------------------")
        const lang = auth.lang;
        if (lang === "UA") {
			//console.log("changeLang to EN")
            localStorage.setItem("lang", "EN")
			auth.setL("EN");

		}
		if (lang === "EN") {
			//console.log("changeLang to UA")
            localStorage.setItem("lang", "UA")

			auth.setL("UA");
        }
    }

    return (
        <div>
            <div className="header">
                <div className="logo"><NavLink to="/home">HEADER logo</NavLink></div> 
                <button className="lang" onClick={changelang} >
                    {`${auth.lang}` }
                    </button>
                <UserMenu auth={state} />
            </div>
            <Outlet/>
        </div>
    )







    
}
export default Layout;