import React, {useState, useEffect} from "react";
import useApi from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import ListItem from "../AdminListItem/index.js"
import EditItem from "../EditItem"
import ShareItem from "../ShareItem"
import uselangLocalization from "../../hooks/langLocalization"
import CreateListItem from "../AdminCreateListItem";
//import "./styles.css"
import Pages from '../Pagination/pagination.js';

const AdminUserView = (props) => {

const params = useParams();
const api = useApi();
console.log(params.id)

const locale = uselangLocalization();
const pagLimit = 10;


//const editableID=null;

  useEffect(()=>{
    getUser();
  }, []);

const filter = {
  all: "all",
  done: "done",
  new: "new"
}

const [UserData, updateUserState] = useState({});
const [updatedList, updateListState] = useState({todoList:[], page:1, total:undefined, limit: pagLimit});
const [currentModal, updateModal] = useState({});
const [currentShareModal, updateShareModal] = useState({});
const [newFilterMode, updateFilter] = useState(filter.all);

const getUser = async () => {
    console.log("try get User DAta");
    const update = async (getTodoResp) => {
      updateUserState({...getTodoResp.data})
      if (getTodoResp.data._id) {
        getTodo();
      }

    }
    await api.getUserbyid({id: params.id}).then(update);
}


const getTodo = async (page=1) => {
    console.log("try get User todos");
  const update = async (getTodoResp) => {
    updateListState(getTodoResp.data)
    console.log(getTodoResp);
    //console.log("update");
  }
  await api.adminGetUserTodos({id: params.id, limit: pagLimit, page: page}).then(update);
}

//console.log("4")
  
    const createHandler = async (newItemTitle) => {
      await api.AdminAddItem(newItemTitle);
      getTodo();
      //console.log("add " + newItemTitle)
    }
  
    const deleteItem = async (clickedID) => {
      console.log(`delete ${clickedID}`);
        await api.adminDelItem({
          "id": clickedID,
          })
          getTodo();
    }

    const doneItem = async (clickedID, currStatus) => {
      console.log(`doneItem ${clickedID}`);
      console.log(`doneItem ${currStatus}`);
      await api.AdminIsComplited({
        "id": clickedID,
        "isComplited": !currStatus,
        })
        getTodo();
    }
  //--------------------------------------------------------------EDIT
  const handleClose = () => {
      updateModal({});
  }
  
  const handleSave = async (editableID, editedTitle) => {
    console.log(`editableID ${editableID}`);
    console.log(`editedTitle ${editedTitle}`);
    await api.adminUpdate({
      "id": editableID,
      "text": editedTitle,
      })
      getTodo();
      updateModal({});
  }

  const editItemHandler = (editableID, editableTitle) => {
      updateModal({show:true, _id:editableID, text:editableTitle});
  }
  
  function showEditModal() {
      return (
          <EditItem 
          show={currentModal.show} 
          _id={currentModal._id} 
          text={currentModal.text}
          handleClose = {handleClose} 
          handleSave={handleSave}
      ></EditItem>  
      )
  }
  //--------------------------------------------------------------SHARE
  
  const handleShareClose = () => {
    updateShareModal({});
}

  function showShareModal() {
    return (
        <ShareItem 
        show={currentShareModal.show} 
        _id={currentShareModal._id} 
        text={currentShareModal.text}
        handleClose = {handleShareClose} 
        handleSave={handleShare}
    ></ShareItem>  
    )
}

const handleShare = async (itemID, recepientID) => {
  console.log(`itemID ${itemID}`);
  console.log(`recepientID ${recepientID}`);
  await api.adminShare({
    "id": itemID,
    "recepient": recepientID,
    });
  getTodo();
  updateShareModal({});
}

const ShareItemHandler = (editableID, typedUser) => {
  //console.log("clicked Edit on item with ID " + editableID);
  updateShareModal({show:true, _id:editableID, text:typedUser});
  //setTimeout(()=>{console.log(currentModal)}, 1000);
}
//--------------------------------------------------------------|

  const filterItems = () => {
    //console.log("updatedList");
    //console.log(updatedList);
    switch (newFilterMode){ 
      case filter.all: 
        return updatedList.todoList;        
      case filter.done:
        return updatedList.todoList.filter((someItem) => someItem.isComplited === true);
      case filter.new:
        return updatedList.todoList.filter((someItem) => someItem.isComplited === false);
      }
      
  }

//console.log(updatedList);
//--------------------------------------------------------------PAGINATION

const onChangePage = (page) => {
  console.log(`page ${page}`)
  if (page === updatedList.page) {
    return;
  };
  getTodo(page);
};

const getPagesCount = () => {
  return Math.ceil(updatedList.total / updatedList.limit);
};
//--------------------------------------------------------------|

  return (
    <div className="List"> 
        "AdminUserView"
        <hr/>
            <div>{UserData.userName?UserData.userName:locale.currLang.placeholders.UserName}</div>      
            <div>{UserData.userSurname?UserData.userSurname:locale.currLang.placeholders.UserSurname}</div>     
            <div>{UserData.email?UserData.email:locale.currLang.placeholders.UserEmail}</div>     
            <div>{UserData.roles?UserData.roles:locale.currLang.labels.isAdmin}</div>   
        <hr/>
        <CreateListItem createHandler = {createHandler} />
        <hr/>
        <div className="filterBar"> {locale.currLang.labels.filter}
          <button className="felter-buttons"  onClick = {()=>updateFilter(filter.all)}>{locale.currLang.btns.all}</button>
          <button className="felter-buttons"  onClick = {()=>updateFilter(filter.done)}>{locale.currLang.btns.done}</button>
          <button className="felter-buttons"  onClick = {()=>updateFilter(filter.new)}>{locale.currLang.btns.new}</button>
        </div>
        {
            filterItems().map((item)=>(
                <ListItem 
                    key={item._id} 
                    {...item} 
                    deleteItem={deleteItem} 
                    editItemHandler={editItemHandler} 
                    ShareItemHandler={ShareItemHandler}
                    doneItem={doneItem} 
                ></ListItem>
            ))
            
        }     
        <Pages
            onChange={onChangePage}
            active={updatedList.page}
            pages={getPagesCount()}
            maxButtons={3}
          />   
        {currentModal.show?showEditModal():console.log()}
        {currentShareModal.show?showShareModal():console.log()}
          
    </div>
  )
}
      
export default AdminUserView