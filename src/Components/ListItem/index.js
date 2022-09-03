import { useAuth } from "../../hooks/useAuth.js";
import uselangLocalization from "../../hooks/langLocalization"
//import "./styles.css"


const ListItem = (props)=>{
    const locale = uselangLocalization();
    const auth = useAuth();
    //console.log(props)
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
    //console.log(props);
    //console.log(auth.storedData.user.id);
    const isOvner = () => {
        if (props.owner === auth.storedData.user.id) {
            return (
            <div className="listItem"  >
                <div 
                    className={"listItem-title" + (props.status? " done" : " new")}
                    onClick={()=>props.showItemHandler(props._id)}
                > 
                    {props.text}
                </div>
                <div className="listItem-buttons">
                    <div className="listItem-status"><input type="checkbox"  className = "checkbox-status" defaultChecked={props.isComplited} onClick={()=>props.doneItem(props._id, props.isComplited)}/></div>
                    <div className="listItem-edit" aria-disabled={isOvner} onClick={()=>props.editItemHandler(props._id, props.text)}>{locale.currLang.btns.edit}</div>
                    <div className={haredSryle(props)}  onClick={()=>props.ShareItemHandler(props._id, props.text)}>{locale.currLang.btns.share}</div>
                    <div className="listItem-del" onClick={()=>props.deleteItem(props._id)}>X</div>
            </div>
        </div>);
        }

        return (
        <div className="listItem"  >
        <div className={"listItem-title" + (props.status? " done" : " new")}> {props.text}</div>
        <div className="listItem-status"><input type="checkbox"  className = "checkbox-status" defaultChecked={props.isComplited} onClick={()=>props.doneItem(props._id, props.isComplited)}/></div>
        <div className="listItem-del" onClick={()=>props.deleteItem(props._id)}>X</div>
    </div>
    );
    }
    //console.log(`owner ${isOvner()}`);
    
    return (isOvner()
    )   
}






export default ListItem;

