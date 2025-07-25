import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import EditUser from "./components/EditUser";
import Navabr from "./components/Navabr";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navabr/>
        <div className="container mt-4">
          <h1 className="text-center"> user Management</h1>
          <Routes>
            <Route path="/" element={<UserList/>}/>
            <Route path="/add" element={<UserForm/>}/>
            <Route path="/edit/:id" element={<EditUser/>}/>
          </Routes>

        </div>
      </Router>
    </UserProvider>
    
  )
}

export default App
