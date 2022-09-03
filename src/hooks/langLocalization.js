
import { useAuth } from "../hooks/useAuth";

const useLangLocalization = () => {
	
	const auth = useAuth();
	//console.log(auth);
	const lang = auth.lang;
	//console.log(`display lang: ${lang}`);
	//console.log(auth);  

	const currLang = () => {

		if (!lang) {
			return LangUA();
		}
		if (lang === "EN") {
			return LangEN();
		}
		return LangUA();
	}
	const changeLang = () => {
		if (lang === "EN") {
			console.log("changeLang to EN")
			//auth.LangEN();
		}
		if (lang === "UA") {
			//console.log("changeLang to UA")
			//auth.LangUA();
		}
	}
	const LangUA = () => {
		 return {
			 btns:{
				edit: "редагувати",
				share: "поділитися",
				login: "війти",
				logout: "вийти",
				register: "реєстрація",
				all: "всі",
				done: "готові",
				new: "нові",
				createNewUser: "створити користувача",
				close: "закрити",
				create: "створити",
				admin: "адміністрування",
				addItem: "додати туду",
				save: "зберегти",

				


			 },
			 labels: {
				filter: "фільтр",
				todos: "тудушки",
				users: "користувачі",
				settings: "налаштування",
				createUser: "Створення користувача",
				isAdmin: "адмін",
				editUser: "Редагування користувача",
				shareItem : "Розшарити туду",
				editItem : "Редагувати туду",
				todoImfo: "Інформація про тудушку",
				Owner: "Власник:",
				Sharedwith: "Нею поділилися з:",
				text: "Текст:"

			 },
			 placeholders: {
				UserName: "ім'я користувача", 
				UserSurname: "фамілія користувача", 
				UserEmail: "пошта користувача", 
				UserPass: "пароль",
				UserPass2: "пароль ще раз", 
				findUserbyEmail: "найти користувача за @",
				newItem: "нова туду",
				newItemOwner: "@ отримувача туду",
				itemNewText: "новий текст туду",
				findTodoByEmail: "найти тудушку за текстом",
			 }
		

		 }
	}
	const LangEN = () => {
		return {
			btns:{
			   edit: "edit",
			   share: "share",
			   login: "login",
			   logout: "logout",
			   register: "register",
			   all: "all",
			   done: "done",
			   new: "new",
			   createNewUser: "createNewUser",
			   close: "close",
			   create: "create",
			   admin: "admin",
			   addItem: "add item",
			   save: "save",
				
			   


			},
			labels: {
			   filter: "filter",
			   todos: "todos",
			   users: "users",
			   settings: "",
			   createUser: "createUser",
			   isAdmin: "isAdmin",
			   editUser: "Edit user",
				shareItem : "Share item",
				editItem : "Edit item",
				todoImfo: "Todo info",
				Owner: "Owner:",
				Sharedwith: "Shared with:",
				text: "Text:",

			},
			placeholders: {
			   UserName: "name", 
			   UserSurname: "surname", 
			   UserEmail: "user email", 
			   UserPass: "pass",
			   UserPass2: "pass again", 
			   findUserbyEmail: "find user by @",
			   newItem: "new item",
			   newItemOwner: "New item owner @",
			   itemNewText: "new item text",
			   findTodoByEmail: "find todo by text",
			}
	   

		}
	}

	return {currLang: currLang() , changeLang: changeLang()};
	


}
export default useLangLocalization;