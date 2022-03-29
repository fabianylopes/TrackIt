import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from "./contexts/UserContext";
import Login from "./components/Login";
import Subscribe from "./components/Subscribe";
import Today from "./components/Today";

export default function App() {
    const [token, setToken] = useState([]);

  return (
    <UserContext.Provider value={{ token, setToken }}>  
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/subscribe" element={<Subscribe/>}></Route>
                <Route path="/today" element={<Today/>}></Route>

            </Routes>
        </BrowserRouter>
    </UserContext.Provider>
  );
}
