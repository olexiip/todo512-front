import { useState, useEffect } from "react"
import {Modal} from "react-bootstrap";
import UserItem from "../UserItem";
import useApi from "../../hooks/useApi";
import uselangLocalization from "../../hooks/langLocalization"

const ShareItem = (props) => {
    //console.log(props);
    const api = useApi();
    const locale = uselangLocalization(); 
//console.log("EditItem " + props.id);
//console.log(props);

const [newItemTitle, setNewListTitle] = useState(""); 
const [sharedWith, setSahreList] = useState([]); 
const [NewList, setNewList] = useState({searchRes:[]}); 
//console.log(NewList);
    //const [searchTerm, setSearchTerm] = useState('')

const UPDATElist = (data) => {
    setNewList(data);
}

const search = async (q) => {
    console.log(q);
    if (q.length>0) {
        const searchRes = await (await api.findUser({email: q})).data;
        console.log("searchRes");
        console.log(searchRes);
        if (searchRes.searchRes.length>0) {
            console.log("=======================>");
            UPDATElist(searchRes);
           return searchRes;
        }
        
    }
    return [];
}
    useEffect(() => {
        listShare();
        if (newItemTitle.length>0) {
            const delayDebounceFn = setTimeout(() => {
               search(newItemTitle);
                //UPDATElist(searchRes);
              }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
        UPDATElist({searchRes:[]});
    }, [newItemTitle])
  
const PickItem =(e) =>{
    //e.preventDefault();
    console.log("PICK PICK PICK___________________________");
    console.log(e);

    props.handleSave(e.SharedItemID, e._id);

}

const onTypeHandler = (e) => {
    setNewListTitle(e.target.value)
}
const onSubmitkHandler = (e) => {
    e.preventDefault();
   // props.handleSave(props._id, newItemTitle);
    //setNewListTitle("");
}

const listShare = async () => {
    const showRes = (aaaaaa) => {
        const normArray = aaaaaa.data.users;
        setSahreList(normArray);
        console.log(normArray);
    }
    await api.sharedWith({id: props._id}).then(showRes);
}



return (
<div>
    <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <form onSubmit={onSubmitkHandler} >    
                <Modal.Header closeButton>
                    <Modal.Title>{locale.currLang.labels.shareItem}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        type="text" 
                        value={newItemTitle} 
                        className="inputNewItem" 
                        placeholder={locale.currLang.placeholders.findUserbyEmail}
                        onChange={onTypeHandler}
                    />    

                {
                    

                    NewList.searchRes.map((item)=>(
                        <UserItem 
                        key={item._id} 
                        {...item} 
                        PickItem={PickItem} 
                        SharedItemID={props._id}
                        ></UserItem>
                    ))
              
                }   
                <hr/> 
                {
                    sharedWith.map((item)=>(
                        <div key={item._id}>
                            {item.email}
                        </div>
                    ))
                }
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        onClick={()=>(props.handleClose())}
                    >{locale.currLang.btns.close}</button>
                </Modal.Footer>
            </form>  
    </Modal>
</div>
)}

export default ShareItem