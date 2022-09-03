import ListItem from "../ListItem/index.js"
import EditItem from "../EditItem"
import ShareItem from "../ShareItem"
import ShowItem from "../ShowItemModal"
//import "./styles.css"
import React, {useState, useEffect} from "react";
import CreateListItem from "../CreateListItem";
import useApi from "../../hooks/useApi.js"
import uselangLocalization from "../../hooks/langLocalization"
import Pages from '../Pagination/pagination.js';

const List = () => {  
  console.log(">>>List")
  const api = useApi();
  const locale = uselangLocalization();

  const pagLimit = 10;

    useEffect(()=>{
      getTodo(1);
    }, []);

  const filter = {
    all: "all",
    done: "done",
    new: "new"
  }

  const [updatedList, updateListState] = useState({todoList:[], page:1, total:undefined, limit: pagLimit});
  const [currentModal, updateModal] = useState({});
  const [currentShareModal, updateShareModal] = useState({});
  const [currentShowModal, updateShowModal] = useState({});
  const [newFilterMode, updateFilter] = useState(filter.all);
  
  const getTodo = async (page=1) => {
    const update = async (getTodoResp) => {
      //console.log(getTodoResp.data);s
      updateListState(getTodoResp.data);
      console.log("update list");
    }
    await api.getTodos({ limit: pagLimit, page: page}).then(update);
  }
    
  const createHandler = async (newItemTitle) => {
        await api.addItem({
          "text": newItemTitle,
          })
        getTodo(1);
        //console.log("add " + newItemTitle)
  }
    
  const deleteItem = async (clickedID) => {
        console.log(`delete ${clickedID}`);
          await api.delItem({
            "id": clickedID,
            })
            getTodo();
  }

  const doneItem = async (clickedID, currStatus) => {
        console.log(`doneItem ${clickedID}`);
        console.log(`doneItem ${currStatus}`);
        await api.isComplited({
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
      await api.update({
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
      //console.log("clicked Edit on item with ID " + editableID);
      updateShowModal({show:true, _id:editableID});
      //setTimeout(()=>{console.log(currentModal)}, 1000);
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
    await api.share({
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
      
      switch (newFilterMode){ 
        case filter.all: 
          return updatedList.todoList;        
        case filter.done:
          return updatedList.todoList.filter((someItem) => someItem.isComplited === true);
        case filter.new:
          return updatedList.todoList.filter((someItem) => someItem.isComplited === false);
        }
        
  };
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
  
          <CreateListItem createHandler = {createHandler} />
          <div className="filterBar"> {locale.currLang.labels.filter}
            <button className="feiter buttons"  onClick = {()=>updateFilter(filter.all)}>{locale.currLang.btns.all}</button>
            <button className="feiter buttons"  onClick = {()=>updateFilter(filter.done)}>{locale.currLang.btns.done}</button>
            <button className="feiter buttons"  onClick = {()=>updateFilter(filter.new)}>{locale.currLang.btns.new}</button>
          </div>
          {
              filterItems().map((item)=>(
                  <ListItem 
                      key={item._id} 
                      {...item} 
                      deleteItem={deleteItem} 
                      editItemHandler={editItemHandler} 
                      ShareItemHandler={ShareItemHandler}
                      showItemHandler={showItemHandler}
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

export default List;