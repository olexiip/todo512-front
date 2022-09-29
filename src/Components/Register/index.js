//import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import useApi from "../../hooks/useApi.js"
//import "./styles.css"
import { useNavigate } from "react-router-dom";
    

const RegisterForm = () => {
    const api = useApi();
    //const auth = useAuth();
    const navigate = useNavigate();

    const [currentFormFields, setNewFormFields] = useState({
        userName: "",
        userSurname: "",
        userEmail: "",
        userPass: "",
        userPass2: "",
        userDateOfBirth: ""
    });
    
    const [showPass, setPassVisib] = useState(false);

    const onFormChange = (key, e) => {
        setNewFormFields({...currentFormFields, ...{[key]: e.target.value}});
    }
    const onSubmitkHandler = async (e) => {
        
        e.preventDefault();
        //console.log(`login: ${currentFormFields.userEmail} pass: ${currentFormFields.userPass}`)
        //auth.loginF({login : currentFormFields.userEmail, pass : currentFormFields.userPass})
        const req = await api.register(currentFormFields);
        console.log(req.data.user);
        if (req.data?.user?.id) {
            alert("ok)");
            navigate("/login", {replace: true});
            return [];
        }
        if (req.data?.res=== "email already in use") {
            return alert("email already in use");
        }
        alert("some error((");
        //console.log(req.data);

    }

    const passVisibControllerLabel = () => {
        if(!showPass){
            return "show";
        }
        return "hide";
    }
    const passVisibController = () => {
        setPassVisib(!showPass);
    }


    const NameValidation = () =>{
        return ((currentFormFields.userName).length>0)
    };
    const SurnameValidation = () =>{
        return ((currentFormFields.userSurname).length>0)
    };
    const EmailValidation = () =>{
        return ((currentFormFields.userEmail).length>4)
    };
    const PassValidation = () =>{
        return ((currentFormFields.userEmail).length>4 && (currentFormFields.userPass).length>4 
        && currentFormFields.userPass===currentFormFields.userPass2)
    };




    const disabledRegButton = () => {
        if (NameValidation() && PassValidation()) {
            return false;
        }
        return true;
    };


    return (
        <div>
            <form className="login-form" onSubmit={onSubmitkHandler}> 
                <input 
                    type="text" 
                    value={currentFormFields.userName} 
                    className={NameValidation()?"auth":"auth bad-field"} 
                    placeholder="Name" 
                    onChange={(e) => onFormChange("userName", e)}
                />
                <input 
                    type="text" 
                    className={SurnameValidation()?"auth":"auth bad-field"} 
                    value={currentFormFields.userSurname} 
                    placeholder="Surname" 
                    onChange={(e) => onFormChange("userSurname", e)}
                />
                <input 
                    type="text" value={currentFormFields.userEmail} 
                    className={EmailValidation()?"auth":"auth bad-field"} 
                    placeholder="your email" 
                    onChange={(e) => onFormChange("userEmail", e)}
                />
                <br/>
                <div className="pass-wrapper">
                    <input 
                        type={showPass ? "text" : "password"} 
                        value={currentFormFields.userPass} 
                        className={PassValidation()?"auth":"auth bad-field"} 
                        placeholder="your pass" 
                        onChange={(e) => onFormChange("userPass", e)}
                    />
                    <div className="show-pass" onClick={passVisibController}>{passVisibControllerLabel()}</div>
                </div>
                <div className="pass-wrapper">
                    <input 
                        type={showPass ? "text" : "password"} 
                        value={currentFormFields.userPass2} 
                        className={PassValidation()?"auth":"auth bad-field"} 
                        placeholder="again pass" 
                        onChange={(e) => onFormChange("userPass2", e)}
                    />
                </div>
                <input 
                    type="text" 
                    value={currentFormFields.userDateOfBirth} 
                    placeholder="date of birth" 
                    onChange={(e) => onFormChange("userDateOfBirth", e)}
                />
                <button className = "login-button" disabled={disabledRegButton()} type="submit">Try register</button>
            </form>
        </div>

    )
}

export default RegisterForm;