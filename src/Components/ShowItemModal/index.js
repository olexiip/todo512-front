import { useState, useEffect } from "react"
import {Modal} from "react-bootstrap";
import useApi from "../../hooks/useApi";
import uselangLocalization from "../../hooks/langLocalization"

const ShareItem = (props) => {

    const api = useApi();
    const locale = uselangLocalization(); 

    const [info, setinfo] = useState({users:[],owner:{}, todoshka:{}}); 

    useEffect(() => {
        listShare();
    }, [])
  

    const listShare = async () => {
        const showRes = (aaaaaa) => {
            console.log(aaaaaa.data);
            const normArray = aaaaaa.data.users;
            setinfo(aaaaaa.data);
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
            <form >    
                <Modal.Header closeButton>
                    <Modal.Title>{locale.currLang.labels.todoImfo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>{locale.currLang.labels.text} </div>
                <div>{info.todoshka.text} </div>

                <hr/>
                <div>{locale.currLang.labels.Owner} </div>
                <div>{info.owner.userName}{" "}{info.owner.userSurname}</div>
                <div> </div>
                <div>{info.owner.email} </div>
                <hr/>
                {locale.currLang.labels.Sharedwith}
                {
                    info.users.map((item)=>(
                        <div key={item._id} >
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