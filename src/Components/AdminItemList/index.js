import ListItem from "../AdminListItem/index.js"
import EditItem from "../EditItem"
import ShareItem from "../ShareItem"
import ShowItem from "../ShowItemModal"
import React, {useState, useEffect} from "react";
import CreateListItem from "../AdminCreateListItem";
import useApi from "../../hooks/useApi.js"
import uselangLocalization from "../../hooks/langLocalization"
import Pages from '../Pagination/pagination.js';
//import "./styles.css"

const AdminItemList = () => {  

  const api = useApi();
  const locale = uselangLocalization();

  const pagLimit = 10;

  const filter = {
    all: "all",
    done: "done",
    new: "new"
  }

  const [updatedList, updateListState] = useState({todoList:[], page:1, total:undefined, limit: pagLimit});
  const [currentModal, updateModal] = useState({});
  const [currentShareModal, updateShareModal] = useState({});
  const [newFilterMode, updateFilter] = useState(filter.all);
  const [newSearch, updateSearch] = useState("");
  const [currentShowModal, updateShowModal] = useState({});
  
  const getTodo = async (page=1) => {
    const update = async (getTodoResp) => {
      updateListState(getTodoResp.data)
      console.log("update");
    }
    await api.adminGetTodos({ limit: pagLimit, page: page}).then(update);
  }
    
      const createHandler = async (newItemTitle) => {
        await api.AdminAddItem(newItemTitle);
        getTodo(1);
      }
    
      const deleteItem = async (clickedID) => {
        console.log(`delete ${clickedID}`);
          await api.adminDelItem({
            "id": clickedID,
            })
            getTodo(1);
      }

      const doneItem = async (clickedID, currStatus) => {
        console.log(`doneItem ${clickedID}`);
        console.log(`doneItem ${currStatus}`);
        await api.AdminIsComplited({
          "id": clickedID,
          "isComplited": !currStatus,
          })
          getTodo(1);
      }
  
      const filterItems = () => {
        switch (newFilterMode){ 
          case filter.all: 
            return updatedList.todoList;        
          case filter.done:
            return updatedList.todoList.filter((someItem) => someItem.isComplited === true);
          case filter.new:
            return updatedList.todoList.filter((someItem) => someItem.isComplited === false);
          } 
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
        getTodo(1);
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
   //--------------------------------------------------------------SHOW  
   const handleShowClose = () => {
    updateShowModal({});
}
  const showShowModal = () => {
    console.log("show item")
    return (
      <ShowItem 
      show={currentShowModal.show} 
      _id={currentShowModal._id} 
      handleClose = {handleShowClose} 
      > </ShowItem>  )
  };
  const showItemHandler = (editableID) => {
    updateShowModal({show:true, _id:editableID});
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
    getTodo(1);
    updateShareModal({});
  }
  
  const ShareItemHandler = (editableID, typedUser) => {
    updateShareModal({show:true, _id:editableID, text:typedUser});
  }
  //--------------------------------------------------------------SEARCH
  const UPDATElist = (data) => {
    const prepState =data;
    updateListState(prepState);
  }

  const search = async (q) => {
  console.log(q);
  if (q.length>0) {
    const searchRes = await (await api.findTodo({q: q})).data;
        UPDATElist(searchRes);
        return searchRes;
  }
  getTodo(1);
  return [];
  }
  const updateSearchField = (e) => {
    updateSearch(e.target.value);
  } 

  useEffect(() => {
  if (newSearch.length>0) {
      const delayDebounceFn = setTimeout(() => {
         search(newSearch);
        }, 1000)
      return () => clearTimeout(delayDebounceFn)
  }
  UPDATElist({todoList:[]});
  getTodo(1);
  }, [newSearch])
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
	  	ADMIN ITEM LIST
      <hr/>
          <input 
              type="text" 
              value={newSearch} 
              className="input-search" 
              placeholder={locale.currLang.placeholders.findTodoByEmail} 
              onChange={updateSearchField}
          />    
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
                      showItemHandler={showItemHandler}
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
          {currentShowModal.show?showShowModal():console.log()}
            
      </div>
    )
}

export default AdminItemList;