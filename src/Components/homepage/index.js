import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
//import "./styles.css"
import Header from "../../Components/header/index.js"
    
const HomePage = () => {
    console.log(">>>Home page");
    const auth = useAuth();

    //console.log("-------------------------------------------------------------");
    //localStorage.setItem("1","1");
    //console.log(localStorage);
    //console.log(auth);
    //console.log("---------------------------refres--------------------");
    //localStorage.clear();
    //console.log(auth);
    //localStorage.setItem("1","2");


    //const [state, newS] = useState(0);
    //let kek = 0;




    //const buttonHandler = () => {
        //console.log("click!")
    
        //auth.refresh(prev++);
        //let fff = state+1;
        //console.log(fff);
        //newS(fff);
        //console.log(kek++);

    //}
    //console.log(kek);


   
    return (<div>
                <div>
                    <h2>Home page</h2>
         
                </div>
            </div>
            
    )
}

export default HomePage;