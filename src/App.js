import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";

export default function App() {
    const [token, setToken] = useState([]);

  return (
    <UserContext.Provider value={{ token, setToken }}>  
        <BrowserRouter>
            <Routes>
                <Route></Route>
            </Routes>
        </BrowserRouter>
    </UserContext.Provider>
  );
}
