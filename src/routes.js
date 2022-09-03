import { Route, Routes, Navigate } from "react-router-dom"
import LoginForm from "./Components/login";
import RegisterForm from "./Components/Register";
import List from "./Components/List"
import HomePage from "./Components/homepage"
import ProtectedRouteK  from "./Components/ProtectedRoute/PtotectedRoute.js";
import UserPage from "./Components/userPage/userPage";
import AdminPage from "./Components/AdminPage"
import AdminItemList from "./Components/AdminItemList"
import AdmAdminUserList from "./Components/AdminUserList"
import Layout from "./Components/header/index"
import ProtectedRouteAdmin from "./Components/ProtectedRoute/PtotectedRoute Admin"
import AdminUserView from "./Components/AdminUserView/index"

const Index = () => {
    return (
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to="/home" replace={true}/>}></Route>
                    <Route path="home" element={<HomePage/>}></Route>
                    <Route path="login" element={<LoginForm/>}></Route>
                    <Route path="register" element={<RegisterForm/>}></Route>
                    <Route element={<ProtectedRouteK/>}> 
                        <Route path="/todos" element={<List/>}></Route>
                        <Route path="/me" element={<UserPage/>}></Route>
                        <Route element={<ProtectedRouteAdmin/>}> 
                            <Route path="/admin" element={<AdminPage/>}> </Route>
                                <Route path="/admin/todos" element={<AdminItemList/>}/>
                                <Route path="/admin/users" element={<AdmAdminUserList/>}/>
                                <Route path="/admin/user/:id" element={<AdminUserView/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/home" replace={true}/>}></Route>
                </Route>
            </Routes>
    )
}

export default Index;