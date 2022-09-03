
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProvideAuth} from "./hooks/useAuth.js"
import CustomRoutes from "./routes"
import "./styles.css"


function App() {



  return (
    <div className="todo">
    <ProvideAuth>
      <CustomRoutes></CustomRoutes>
    </ProvideAuth>
    </div>
    )
}

export default App;
