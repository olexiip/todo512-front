//import "./styles.css"
import uselangLocalization from "../../hooks/langLocalization"

const UserItem = (props)=>{
	//console.log("UserItem");
    //console.log(props);
    const locale = uselangLocalization(); 
    return (
        <div className="listItem">
            <div >{props.email} </div>
            <div className="listItem-buttons">
            <button 
                className="share-button" 
                onClick={()=>props.PickItem(props)}
                >
                    {locale.currLang.btns.share}
                </button>
            </div>
			
        </div>
	);

}
export default UserItem;