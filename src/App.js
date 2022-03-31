import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from "./contexts/UserContext";
import Login from "./components/Login";
import Subscribe from "./components/Subscribe";
import Today from "./components/Today";
import Habits from "./components/Habits";
import History from "./components/History";

export default function App() {
    const [token, setToken] = useState([]);
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider value={{ token, setToken, userInfo, setUserInfo, loading, setLoading}}>  
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/subscribe" element={<Subscribe/>}></Route>
                <Route path="/today" element={<Today/>}></Route>
                <Route path="/habits" element={<Habits/>}></Route>
                <Route path="/history"element={<History/>}></Route>
            </Routes>
        </BrowserRouter>
    </UserContext.Provider>
  );
}
