import { NavLink } from "react-router-dom";
import uselangLocalization from "../../hooks/langLocalization"
//import "./styles.css"
const UserPage = () => {
    const locale = uselangLocalization();
    return (
        <div className="menu">
                <p><NavLink to="/admin/todos">{locale.currLang.labels.todos}</NavLink></p>
				<p><NavLink to="/admin/users">{locale.currLang.labels.users}</NavLink></p>
        </div>

    )
}

export default UserPage;