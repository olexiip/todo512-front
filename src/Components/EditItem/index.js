import { useState } from "react"
import {Modal} from "react-bootstrap";
import uselangLocalization from "../../hooks/langLocalization"


const EditItem = (props) => {
const locale = uselangLocalization(); 
//console.log("EditItem " + props.id);
//console.log(props);

const [newItemTitle, setNewListTitle] = useState(props.text); 
const onTypeHandler = (e) => {
    setNewListTitle(e.target.value)
}
const onSubmitkHandler = (e) => {
    e.preventDefault();
    props.handleSave(props._id, newItemTitle);
    setNewListTitle("");
}

return (
<div>
    <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={onSubmitkHandler}>   
                <Modal.Header closeButton>
                    <Modal.Title>{locale.currLang.labels.editItem}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        type="text" 
                        value={newItemTitle} 
                        className="inputNewItem" 
                        placeholder={locale.currLang.placeholders.itemNewText} 
                        onChange={onTypeHandler}
                    />                               
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        onClick={()=>(props.handleClose())}
                    >{locale.currLang.btns.close}</button>
                    <button 
                        disabled={!newItemTitle.length} 
                    >{locale.currLang.btns.save}</button>
                </Modal.Footer>
            </form>  
    </Modal>
</div>
)}

export default EditItem