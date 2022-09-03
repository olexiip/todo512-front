import React, {useState, useEffect} from "react";
import useApi from "../../hooks/useApi";
import UserItem from "../UserItem";


//import "./styles.css"


const CreateListItem = (props) => {
    const api = useApi();
    const [newUser, setNewUserProps] = useState(""); 
    const [NewList, setNewList] = useState({searchRes:[]}); 

    const UPDATElist = (rerere) => {
        setNewList(rerere);
    }

    //const [newUser, setNewUserProps] = useState({email:"", password:""}); 
    const onTypeHandler1 = (e) => {
        console.log(newUser)
        setNewUserProps(e.target.value)
    }
    
  //  const onSubmitkHandler = (e) => {
  //      e.preventDefault();
  //      props.createHandler(newUser);
  //      setNewUserProps({email:"", password:""});
    //}

    const search = async (q) => {
        "CreateListItem"
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
        if (newUser.length>0) {
            const delayDebounceFn = setTimeout(() => {
               search(newUser);
                //UPDATElist(searchRes);
              }, 1000)
            return () => clearTimeout(delayDebounceFn)
        }
        UPDATElist({searchRes:[]});
    }, [newUser])

    const PickItem =(e) =>{
        //e.preventDefault();
        console.log("PICK PICK PICK___________________________");
        console.log(e);
    
        props.handleSave(e.SharedItemID, e._id);
    
    }



    return (
        
        <div>
            "CreateListItem"
            <button className = "add-button" disabled={!newUser?.length} type="submit">Add item</button>
            <div className="search" >    
                <input type="text" value={newUser} className="inputNewItem" placeholder="find user by Email" onChange={onTypeHandler1}/>
            </div>
        </div>
    )
}

export default CreateListItem;