import { NavLink } from "react-router-dom";
import uselangLocalization from "../../hooks/langLocalization"
//import "./styles.css"

const UserPage = () => {
    console.log(">>>UserPage")
    const locale = uselangLocalization();


    return (
        <div className="menu">
                <p><NavLink to="/todos">{locale.currLang.labels.todos}</NavLink></p>
                <p><NavLink to="/settings">{locale.currLang.labels.settings}</NavLink></p>
        </div>

    )
}

export default UserPage;