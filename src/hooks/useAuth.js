import React, {useContext, createContext, useState} from "react";


const authContext = createContext({});

const goToHomePage = () => {
    window.location.assign('/home');
}


const useProvideAuth = (props) => {
    const loginF = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        goToHomePage();
    };
    const logOutF = async () => {
        console.log("logOutF clear LS");
        localStorage.clear();
        goToHomePage();
    };

    return {
        storedData: JSON.parse(localStorage.getItem("user")),
        loginF,
        logOutF,
        lang: props.langS,
        setL: (data)=>props.setLangWrapper(data),
    };
}


export const ProvideAuth = ({children}) => {
    const LSLang = () => {
        const LSL1 =  localStorage.getItem("lang");
        if (LSL1 === "UA") {
            return LSL1;
        }
        if (LSL1 === "EN") {
            return LSL1;
        }
        if (!LSL1) {
            localStorage.setItem("lang", "UA")
            return "UA"
        }
    };

    const [langS, setLang] = useState(LSLang());
    const setLangWrapper = (newLang) => {
        localStorage.setItem("lang", newLang)
        setLang(newLang);
    }
    const auth = useProvideAuth({langS, setLangWrapper});
    return <authContext.Provider value={auth}>
        {children}
        </authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext)
}
