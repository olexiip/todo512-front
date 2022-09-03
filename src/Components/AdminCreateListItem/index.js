import React, {useState} from "react";
//import "./styles.css"
import uselangLocalization from "../../hooks/langLocalization"

const CreateListItem = (props) => {
    const locale = uselangLocalization();
    const [newItem, setNewListTitle] = useState({owner:"", title:""}); 
    const onTypeHandler1 = (e) => {
        //console.log(newItem)
        setNewListTitle({...newItem, title: e.target.value})
    }
    const onTypeHandler2 = (e) => {
        //console.log(newItem)
        setNewListTitle({...newItem, owner: e.target.value})    
    }
    const onSubmitkHandler = (e) => {
        e.preventDefault();
        props.createHandler(newItem);
        setNewListTitle({owner:"", title:""});
    }
    return (
        
        <form className="formListManager" onSubmit={onSubmitkHandler}>    
            
            <input type="text" value={newItem.title} className="inputNewItem" placeholder={locale.currLang.placeholders.newItem} onChange={onTypeHandler1}/>
            {"       "}
            <input type="text" value={newItem.owner} className="inputNewItem" placeholder={locale.currLang.placeholders.newItemOwner} onChange={onTypeHandler2}/>
            <br/>
            <button className = "add-button" disabled={!(newItem?.owner.length && newItem?.title.length)} type="submit">{locale.currLang.btns.addItem}</button>
        </form>
    )
}

export default CreateListItem;