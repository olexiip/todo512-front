import uselangLocalization from "../../hooks/langLocalization"

//import "./styles.css"


const ListItem = (props)=>{
     console.log(props)
    const locale = uselangLocalization(); 
    const haredSryle = (props) => {
       
        try {
            if (props?.sharedWith.length>0) {
                return "listItem-share green"
            }
            return "listItem-share"
        } catch (e) {
            return "listItem-share"
        }

    }
    return (
       
        <div className="listItem"  >  
            <div 
                className={"listItem-title" + (props.status? " done" : " new")}
                onClick={()=>props.showItemHandler(props._id)}
                >
                    {props.text}
            </div>
            <div className="listItem-buttons">
                <div className="listItem-status">
                    <input 
                        type="checkbox"  
                        className = "checkbox-status" 
                        onClick = {()=>props.doneItem(props._id, props.isComplited)}
                        defaultChecked = {props.isComplited}
                    />
                </div>
                <div className="listItem-edit"  
                    onClick={()=>props.editItemHandler(props._id, props.text)}
                >
                    {locale.currLang.btns.edit}
                </div>
                <div 
                    className={haredSryle(props)} 
                    onClick={()=>props.ShareItemHandler(props._id, props.text)}
                >
                    {locale.currLang.btns.share}
                </div>
                <div 
                    className="listItem-del" 
                    onClick={()=>props.deleteItem(props._id)}
                >
                    X
                </div>
            </div>
        </div>    
    )   
}



export default ListItem;

