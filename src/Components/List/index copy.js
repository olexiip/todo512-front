import ListItem from "../ListItem/index.js"
import EditItem from "../EditItem"
import "./styles.css"
import React, {useState, useEffect} from "react";
import CreateListItem from "../CreateListItem";
//import {Modal} from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth.js";
import useApi from "../../hooks/useApi.js"


const List = () => {  

  const auth = useAuth();
  const api = useApi();



  console.log("0.1");
  //const rawData = {} //getTodo();
  console.log("rawData");
  console.log(rawData);
  console.log("3")

    const editableID=null;
    const rawData = {
      todoList: [
        {
          id: 1,
          text: "title1",
          status: false
        },{
          id: 2,
          text: "title2",
          status: false
        },{
          id: 3,
          text: "title3",
          status: false
        },{
          id: 4,
          text: "title4",
          status: false
        }
      ]
    };
  
    
     // const updateListState;

  const filter = {
    all: "all",
    done: "done",
    new: "new"
  }


  


  const [updatedList, updateListState] = useState(rawData);
  const [currentModal, updateModal] = useState({});
  const [newFilterMode, updateFilter] = useState(filter.all);

  console.log("4")
    
      const createHandler = (newItemTitle) => {
        let newID = Date. now();
        updatedList.todoList.push(
          {_id: newID,
          text: newItemTitle,
          isComplited: false}
        )
        updateListState({...updatedList});
        //console.log("add " + newItemTitle)
      }
    
      const deleteItem = (clickedID) => {
          //console.log("deleteItem")
        updatedList.todoList.map((item, index)=>{
          //console.log(item.id)
          if (item._id===clickedID) {
            delete updatedList.todoList[index];
            //console.log(updatedList)
            updateListState({...updatedList});
            //console.log("deleted item with id: "+ clickedID + " and text: " + item.text)
          }
        })
      }

      const doneItem = (clickedID) => {
        updatedList.todoList.map((item, index)=>{
          //console.log(item.id)
          if (item._id===clickedID) {
            let statusBefore = updatedList.todoList[index].isComplited;
            updatedList.todoList[index].isComplited = !updatedList.todoList[index].isComplited
            let statusNew = updatedList.todoList[index].isComplited;
            //console.log(updatedList)
            updateListState({...updatedList});
            //console.log("change isComplited item id: "+ clickedID + " " + statusBefore + ">>" + statusNew )
          }
        })
      }
      
    const handleClose = () => {
        //console.log("close")
        updateModal({});
    }
    
    const handleSave = (editableID, editedTitle) => {
        //console.log("save id " + editableID)
        //console.log(editableID);
        updatedList.todoList.map((item, index)=>{
            if (item._id===editableID) {
              updatedList.todoList[index].text=editedTitle;
              
              //console.log(updatedList);
              updateListState({...updatedList});
              //console.log("edit item with id: "+ editableID  + " text changes: " + updatedList.todoList[index].text + ">>" + editedTitle)
            }
          })
        updateModal({});
    }
    

    const editItemHandler = (editableID, editableTitle) => {
        //console.log("clicked Edit on item with ID " + editableID);
        updateModal({show:true, _id:editableID, text:editableTitle});
        //setTimeout(()=>{console.log(currentModal)}, 1000);
    }

    function showEditModal() {
        return (
            <EditItem 
            show={currentModal.show} 
            _id={currentModal._id} 
            text={currentModal.text}
            handleClose = {handleClose} 
            handleSave={handleSave}const
        ></EditItem>  
        )
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

    return (
        <div className="List"> 
              <button onClick={api.refresh}>refresh</button>
            <CreateListItem createHandler = {createHandler} />
            <div className="filterBar"> show 
              <button className="feiter buttons" onClick = {()=>updateFilter(filter.all)}>all</button>
              <button className="feiter buttons"  onClick = {()=>updateFilter(filter.done)}>done</button>
              <button className="feiter buttons"  onClick = {()=>updateFilter(filter.new)}>new</button>
            </div>
            {
                filterItems().map((item)=>(
                    <ListItem 
                        key={item._id} 
                        {...item} 
                        deleteItem={deleteItem} 
                        editItemHandler={editItemHandler} 
                        doneItem={doneItem} 
                    ></ListItem>
                ))
                
            }     
            {currentModal.show?showEditModal():console.log()}
              
        </div>
    )
}



export default List;