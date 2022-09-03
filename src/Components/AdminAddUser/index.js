import { useState } from "react"
import {Modal} from "react-bootstrap";
//import "./styles.css"
import uselangLocalization from "../../hooks/langLocalization"

const AdminAddUser = (props) => {
const locale = uselangLocalization(); 
//console.log("EditItem " + props.id);
//console.log("AdminAddUser");
//console.log(props);
const [formState, setFormState] = useState({
    password: "",
    email: "",
    userName: "",
    userSurname: "",
    isAdmin: ""
}); 
//console.log("dddd formState");
//console.log(formState);
const onSubmitkHandler = (e) => {
    e.preventDefault();
    //console.log("click Create");
    props.addUserF(formState);
}

const validate = (e) => {
    //console.log("validate");

    //console.log(`${e?.target?.id} >---> ${e?.target?.value}`);
    //console.log(e);
    if ( e?.target?.id === "isAdmin") {
        e.target.value=e.target.checked;
    }
 
    const fffff = {
        ...formState,
        [e.target.id] : e?.target?.value, 
    }
    //console.log("fffff")
    //console.log(fffff)
    //setFormState(fffff);
   
    
    //setFormState(newUser);
    
    const formoOK = (
        (formState?.userName.length)>1 &&
        (formState?.userSurname.length)>1 &&
        (formState?.email.length)>3 &&
        (formState?.password.length)>3
        );
    setFormState({...formState, ...fffff, isOk : formoOK});   
    
    //return formoOK;
    //console.log("formState>>>>>>>>>>");
    //console.log(formState);
    //console.log("formState>>>>>>>>>>");
}

return (
<div>
    <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={(e)=>onSubmitkHandler(e)} onChange={(e)=>validate(e)}>   
                <Modal.Header closeButton>
                    <Modal.Title>{locale.currLang.labels.createUser}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        id="userName"
                        type="text" 
                        //value={newItemTitle} 
                        className="input-modal" 
                        placeholder={locale.currLang.placeholders.UserName} 
                        //onChange={onTypeHandler}
                    />                   
                    <input 
                        id="userSurname"
                        type="text" 
                        //value={newItemTitle} 
                        className="input-modal" 
                        placeholder={locale.currLang.placeholders.UserSurname} 
                        //onChange={onTypeHandler}
                    />              
                    <input 
                        id="email"
                        type="text" 
                        //value={newItemTitle} 
                        className="input-modal" 
                        placeholder={locale.currLang.placeholders.UserEmail} 
                        //onChange={onTypeHandler}
                    />        
                    <input 
                        id="password"
                        type="text" 
                        //value={newItemTitle} 
                        className="input-modal" 
                        placeholder={locale.currLang.placeholders.UserPass} 
                        //onChange={onTypeHandler}
                    />    
                    <input type="checkbox" id="isAdmin" name="isAdmin" className="checbox-modal" />
                    <label htmlFor="isAdmin">{locale.currLang.labels.isAdmin}</label>


                </Modal.Body>
                <Modal.Footer>
                    <button 
                        onClick={()=>(props.handleClose())}
                    >{locale.currLang.btns.close}</button>
                    <button 
                        disabled={!formState.isOk} 
                    >{locale.currLang.btns.save}</button>
                </Modal.Footer>
            </form>  
    </Modal>
</div>
)}

export default AdminAddUser