import axios from "axios";

const useApi = () => {
    const apiURL = "http://" + (process.env.REACT_APP_BacEnd || `localhost:3001`);
    console.log(apiURL);
    const refreshAuto = async () => {

            const oldToken = JSON.parse(localStorage.getItem("user")).accesToken;
            console.log("old tokens");
            console.log(oldToken);

            const newToken = await axios(`${apiURL}/auth/refresh`, {
                method: "POST",
                data: {refreshToken : JSON.parse(localStorage.getItem("user"))?.refreshToken},
            })

            if (newToken?.data?.refreshToken) {
                saveNewData(newToken.data);
                console.log("refresh ok!")
            } else {
                console.log("refresh failed");
            }  

    }
    //const check = () => {console.log("check")}
    const saveNewData = (userData) => {
        const oldData = JSON.parse(localStorage.getItem("user"));
        const newData = JSON.stringify({...oldData, ...userData});
        localStorage.setItem("user",newData);

        return {"ok":"ok"};
    }


    const axiosReq = async (method, url, data, headers) => {
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.accesToken
            const params = method === "GET"? data : null;
            const body = method !== "GET"? data : null;
            const reqParams = {
                method,
                params,
                data: body,
                headers: {...headers, Authorization: `Bearer ${token}`}
            };
            
            const resp = await axios(`${apiURL}/${url}`, reqParams);    /////// send response
            console.log(resp);

            if (resp.data?.res === "auth error2") {
                console.log("need refresh token");
                await refreshAuto();
                reqParams.headers = {...headers, Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.accesToken}`};
                const newToken = JSON.parse(localStorage.getItem("user")).accesToken;
                console.log("newToken");
                console.log(newToken);  
                const try2 = await axios(`${apiURL}/${url}`, reqParams);
                return try2;
            }
            return resp;
        } catch (e) {
            if (e?.response?.status===401) {
                console.log("catch e ")
                
            }
        throw e;
        }
    };

    return {
        register: (data) => axiosReq("POST", "auth/reg", data),
        logOut: (data) => axiosReq("POST", "auth/logOut", data),
        login: (data) => axiosReq("POST", "auth/login", data),
        addItem: (data) => axiosReq("POST", "v1/api/addItem", data),
        delItem: (data) => axiosReq("delete", "v1/api/delItem", data),
        getTodos: (data) => axiosReq("GET", "v1/api/getAll", data),
        update: (data) => axiosReq("POST", "v1/api/update", data),
        share: (data) => axiosReq("POST", "v1/api/share", data),
        isComplited: (data) => axiosReq("POST", "v1/api/isComplited", data),
        findUser: (data) => axiosReq("POST", "v1/api/findUser", data),
        findTodo: (data) => axiosReq("POST", "v1/api/findTodo", data),
        check: (data) => axiosReq("POST", "auth/check", data),
        sharedWith: (data) => axiosReq("GET", "v1/api/sharedWith", data),

        adminGetTodos: (data) => axiosReq("GET", "v1/api/admin/getAll", data),
        adminGetUserTodos: (data) => axiosReq("GET", "v1/api/admin/getByUser", data),
        getUserbyid: (data) => axiosReq("GET", "v1/api/admin/getbyID", data),
        adminDelItem: (data) => axiosReq("delete", "v1/api/admin/delItem", data),
        adminUpdate: (data) => axiosReq("POST", "v1/api/admin/update", data),
        AdminIsComplited: (data) => axiosReq("POST", "v1/api/admin/isComplited", data),
        AdminAddItem: (data) => axiosReq("POST", "v1/api/admin/addItem", data),
        adminShare: (data) => axiosReq("POST", "v1/api/admin/share", data),


        users: (data) => axiosReq("POST", "v1/api/admin/users", data),
        adduser: (data) => axiosReq("POST", "v1/api/admin/addUser", data),
        delUser: (data) => axiosReq("POST", "v1/api/admin/delUser", data),
        editUser: (data) => axiosReq("POST", "v1/api/admin/editUser", data),
        refresh: refreshAuto,
    };
}
export default useApi;