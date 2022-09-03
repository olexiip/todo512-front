import React, {useState} from "react"
import { useAuth } from "../../hooks/useAuth.js";

import "./styles.css"


const ListItem = (props)=>{
    const auth = useAuth();

    
    return (

        <div className="listItem"  >
            <div className={"listItem-title" + (props.status? "-done" : "-new")}> {props.text}</div>
            <div className="listItem-buttons">    
                <div className="listItem-status"><input type="checkbox"  className = "checkbox-status" defaultChecked={props.isComplited} onClick={()=>props.doneItem(props._id, props.isComplited)}/></div>
                <div className="listItem-edit"  onClick={()=>props.editItemHandler(props._id, props.text)}>Edit</div>
                <div className="listItem-share" onClick={()=>props.ShareItemHandler(props._id, props.text)}>Share</div>
                <div className="listItem-del" onClick={()=>props.deleteItem(props._id)}>X</div>
            </div>
        </div>  

    )   
}



export default ListItem;

