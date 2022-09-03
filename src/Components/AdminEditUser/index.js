import { useState } from "react"
import {Modal} from "react-bootstrap";
import uselangLocalization from "../../hooks/langLocalization"
//import "./styles.css"

const AdminEditUser = (props) => {
    const locale = uselangLocalization(); 
    //console.log("AdminAddUser");
    console.log("props----------------------------------------------------");
    console.log(props);
    let isAdmin;
    if ((props._id?.roles).indexOf("ADMIN")>-1){

        isAdmin = true;
    } else {
        isAdmin = false;
    }
    const [formState, setFormState] = useState({

    }); 

    const onSubmitkHandler = (e) => {
        e.preventDefault();
        if (!validatePass(formState)) {
            delete formState.password2;
            delete formState.password;
        }
        delete formState.password2;
        if (formState.isAdmin===((props._id?.roles).indexOf("ADMIN")>-1)  ) {
            delete formState.isAdmin;
        }
        console.log("onSubmitkHandler ================")
        //console.log("click Create");
        props.handleSave(formState, props._id._id);

    }
    
    const validateName = (data) => {
        const res = ((data?.userName.length)>1);
        if (!res) {
            delete formState.userName;
        }
        return res;
    }

    const validateSurname = (data) => {
        const res = ((data?.userSurname.length)>1);
        if (!res) {
            delete formState.userSurname;
        }
        return res;
    }
    const validatePass = (data) => {
        //console.log("oooooooooooooooooooooooooooooooo")
        //console.log(data);
        if (data?.password) {
            return (data?.password2===data?.password && data?.password.length>1);
        } else {
            return false;
        }

    }
    const validateEmail = (data) => {
        const res = ((data?.email.length)>3);
        if (!res) {
            delete formState.email;
        }
        return res;
    }


    const onChangeF = (e) => {
        //console.log("validate>>>>>>>>>>>>>>>>>>>>>>>>>>");
            let changes;
        if ( e?.target?.id === "isAdmin") {
            changes = {
                ...formState,
                [e.target.id] : e?.target?.checked, 
            }
        } else {
            changes = {
                ...formState,
                [e.target.id] : e?.target?.value, 
            }
        }
        ///const newValues = {...formState, ...fffff};
        //console.log(newValues);
        setFormState({...formState, ...changes});    
    }
    
    return (
    <div>
        <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
            >
                <form onSubmit={(e)=>onSubmitkHandler(e)} onChange={(e)=>onChangeF(e)}>   
                    <Modal.Header closeButton>
                        <Modal.Title>{locale.currLang.labels.editUser}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input 
                            id="userName"
                            type="text" 
                            defaultValue={formState?.userName?formState.userName:props._id.userName} 
                            className={formState?.userName?(validateName(formState)?"input-modal":"input-modal bad-field"):"input-modal"}
                            placeholder={locale.currLang.placeholders.UserName} 
                        />                   
                        <input 
                            id="userSurname"
                            type="text" 
                            defaultValue={formState?.userSurname?formState.userSurname:props._id.userSurname} 
                            className={formState?.userSurname?(validateSurname(formState)?"input-modal":"input-modal bad-field"):"input-modal"}
                            placeholder={locale.currLang.placeholders.UserSurname} 

                        />              
                        <input 
                            id="email"
                            type="text" 
                            defaultValue={formState?.email?formState.email:props._id.email} 
                            className={formState?.email?(validateEmail(formState)?"input-modal":"input-modal bad-field"):"input-modal"}
                            placeholder={locale.currLang.placeholders.UserEmail} 
                        />        
                        <input 
                            id="password"
                            type="text" 
                            defaultValue={formState.password} 
                            className={formState?.password?(validatePass(formState)?"input-modal":"input-modal bad-field"):"input-modal"}
                            placeholder={locale.currLang.placeholders.UserPass} 
                        />    
                        <input 
                            id="password2"
                            type="text" 
                            defaultValue={formState.password2} 
                            className={formState?.password2?(validatePass(formState)?"input-modal":"input-modal bad-field"):"input-modal"}
                            placeholder={locale.currLang.placeholders.UserPass2} 
                        />    
                        <input type="checkbox" id="isAdmin" name="isAdmin" className="checbox-modal" defaultChecked={isAdmin}/>
                        <label htmlFor="isAdmin">{locale.currLang.labels.isAdmin} </label>
    
    
                    </Modal.Body>
                    <Modal.Footer>
                        <button 
                            onClick={()=>(props.handleClose())}
                        >
                            {locale.currLang.btns.close}
                        </button>
                        <button 
                        >{locale.currLang.btns.save}</button>
                    </Modal.Footer>
                </form>  
        </Modal>
    </div>
    )}
    
    export default AdminEditUser