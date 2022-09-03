import AdminUserListItem from "../AdminUserListItem/index.js"
import AdminEditUser from "../AdminEditUser"
import AdminAddUser from "../AdminAddUser"
import React, {useState, useEffect} from "react";
import useApi from "../../hooks/useApi.js"
import uselangLocalization from "../../hooks/langLocalization"
import Pages from '../Pagination/pagination.js';

const AdminUserList = () => {  
  const api = useApi();
  const locale = uselangLocalization(); 
  const pagLimit = 10;
    
  
  const [updatedList, updateListState] = useState({userList:[], page:1, total:undefined, limit: pagLimit});
  const [currentModal, updateModal] = useState({});
  const [currentAddUserModal, updateAddUserModal] = useState({show:false, newUser:""});
  const [newSearch, updateSearch] = useState("");
  
  const getTodo = async (page=1) => {
    const update = async (getTodoResp) => {
      //console.log(getTodoResp.data);
      await updateListState(getTodoResp.data)
    }
    //console.log("update list");
    await api.users({ limit: pagLimit, page: page}).then(update);
  }
      const deleteItem = async (clickedID) => {
        console.log(`delete ${clickedID}`);
          await api.delUser({
            "id": clickedID,
            })
            getTodo();
      }

//--------------------------------------------------------------SEARCH
  const UPDATElist = (data) => {
    //console.log("data");
    //console.log(data);
    updateListState({userList : data.searchRes,  page:1, total:undefined, limit: pagLimit});
  }

  const search = async (q) => {
    console.log(q);
    if (q.length>0) {
      const searchRes = await (await api.findUser({email: q})).data;
      console.log(searchRes);
      //if (searchRes.searchRes.length>0) {
          //console.log("=======================>");
          UPDATElist(searchRes);
          return searchRes;
      //}   
    }
    getTodo();
    return [];
  }
  const updateSearchField = (e) => {
    updateSearch(e.target.value);
  } 

  useEffect(() => {
    if (newSearch.length>0) {
        const delayDebounceFn = setTimeout(() => {
           search(newSearch);
            //UPDATElist(searchRes);
          }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }
    UPDATElist({searchRes:[]});
    getTodo();
}, [newSearch])

//--------------------------------------------------------------EDIT
  const handleClose = () => {
    updateModal({});
  }
  const handleSave = async (props, id) => {
    console.log("save")
    console.log(props)
    console.log("id")
    console.log(id)
    await api.editUser({...props, id:id});
  updateModal({show:false});
  getTodo();
  

  }
  const editItemHandler = (editableID) => {
    //console.log("**********************************************")
    updateModal({show:true, _id:editableID});
  }
    
  function showEditModal() {
    return (
      <AdminEditUser 
        show={currentModal.show} 
        _id={currentModal._id} 
        text={currentModal.text}
        handleClose = {handleClose} 
        handleSave={handleSave}
      ></AdminEditUser>  
      )
    }
//--------------------------------------------------------------ADD USER FORM
const handleAddUserClose = () => {
  updateAddUserModal({show:false, newUser:""});
}
  
  const addUserHandler = (newUserData) => {
    console.log("click add user button")
    console.log(newUserData);
    updateAddUserModal({show:true, props:""});
  }
  const addUserF = async (newUserData) => {
    console.log("form return this:")
    console.log(newUserData);
    await api.adduser(newUserData);
      getTodo();
    updateAddUserModal({show:false, props:""});
  }

  function showAddUserModal() {
      return (
          <AdminAddUser 
          addUserF={addUserF}
          show={currentAddUserModal.show} 
          newUser={currentAddUserModal.newUser} 
          handleClose = {handleAddUserClose} 
      ></AdminAddUser>  
      )};
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
          ADMIN USER LIST
          <button onClick={addUserHandler}>{locale.currLang.btns.createNewUser}</button>
          <hr/>
          <input 
              type="text" 
              value={newSearch} 
              className="input-search" 
              placeholder={locale.currLang.placeholders.findUserbyEmail}//"find user by @" 
              onChange={updateSearchField}
          />    
          <hr/>
        
          {
              updatedList.userList.map((item)=>(
                  <AdminUserListItem 
                      key={item._id} 
                      {...item} 
                      deleteItem={deleteItem} 
                      editItemHandler={editItemHandler} 
                  ></AdminUserListItem>
              ))
              
          }   
          <Pages
            onChange={onChangePage}
            active={updatedList.page}
            pages={getPagesCount()}
            maxButtons={3}
          />    
          {currentModal.show?showEditModal():console.log()}
          {currentAddUserModal.show?showAddUserModal():console.log()}
            
      </div>
    )
}

export default AdminUserList;