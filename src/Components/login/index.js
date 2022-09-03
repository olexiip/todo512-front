import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import useApi from "../../hooks/useApi.js"
import uselangLocalization from "../../hooks/langLocalization"
//import "./styles.css"

const LoginForm = () => {
    const locale = uselangLocalization();
    const auth = useAuth();
    const api = useApi();
    //const locale = uselangLocalization();

    const [newEmailTyped, setNewEmailTyped] = useState("");
    
    const onTypeEmailHandler = (e) => {
        setNewEmailTyped(e.target.value);
    } 
    const [newPassTyped, setNewPassTyped] = useState("");
    const onTypePassHandler = (e) => {
        setNewPassTyped(e.target.value);
    };
     const onSubmitkHandler = async (e) => {
        e.preventDefault();
        //console.log(`login: ${newEmailTyped} pass: ${newPassTyped}`)
        const loginResp = await api.login({email : newEmailTyped, userpass : newPassTyped})
        if (loginResp.data.accesToken) {
            return auth.loginF(loginResp.data);
        }
        window.location.assign(window.location.pathname);
        
    }

    const disabledLoginButton = () => {
        if (newEmailTyped.length>4 && newPassTyped.length>4) {
            return false;
        }
        return true;
    };
    
    return (
        <div>
            <form className="login-form" onSubmit={onSubmitkHandler}> 
                <input type="text" value={newEmailTyped} className="inputLogin" placeholder="your email" onChange={onTypeEmailHandler}/>
                <br/>
                <input type="password" value={newPassTyped} className="inputLogin" placeholder="your pass" onChange={onTypePassHandler}/>
                <br/>
                <button className = "login-button" disabled={disabledLoginButton()} type="submit">{locale.currLang.btns.login}</button>
            </form>
        </div>

    )
}

export default LoginForm;