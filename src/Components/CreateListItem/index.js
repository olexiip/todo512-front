import React, {useState} from "react";
//import "./styles.css"
import uselangLocalization from "../../hooks/langLocalization"

const CreateListItem = (props) => {
    const locale = uselangLocalization();
    const [newItemTitle, setNewListTitle] = useState(""); 
    const onTypeHandler = (e) => {
        setNewListTitle(e.target.value)
    }
    const onSubmitkHandler = (e) => {
        e.preventDefault();
        props.createHandler(newItemTitle);
        setNewListTitle("");
    }
    return (
        
        <form className="formListManager" onSubmit={onSubmitkHandler}>    
            <input type="text" value={newItemTitle} className="inputNewItem" placeholder={locale.currLang.placeholders.newItem} onChange={onTypeHandler}/>
            <button className = "add-button" disabled={!newItemTitle.length} type="submit">{locale.currLang.btns.addItem}</button>
        </form>
    )
}

export default CreateListItem;