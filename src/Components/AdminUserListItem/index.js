import { NavLink } from "react-router-dom";
import uselangLocalization from "../../hooks/langLocalization"
//import "./styles.css"


const ListItem = (props)=>{
    //const auth = useAuth();
    //console.log(props)
    const locale = uselangLocalization(); 
    return (
        
        <div className="listItem">
            
            <div className={"listItem-title"}> 
                <NavLink to={`/admin/user/${props._id}`} >
                    <div > {props.userName} {props.userSurname}</div>
                </NavLink>
                <div className="small-user-email"> ({props.email}) </div>
            </div>
            
            <div className="listItem-buttons">
                <div className="listItem-edit"  onClick={()=>props.editItemHandler(props)}>{locale.currLang.btns.edit}</div>
                <div className="listItem-del" onClick={()=>props.deleteItem(props._id)}>X</div>
            </div>  
        </div>  
        

    )   
}

export default ListItem;

