import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from "./contexts/UserContext";
import PercentageContext from './contexts/PercentageContext';
import Login from "./components/Login";
import Register from "./components/Register";
import Today from "./components/Today";
import Habits from "./components/Habits";
import History from "./components/History";

export default function App() {

  const initialToken = localStorage.getItem('token');
  const initialUserInfo = localStorage.getItem('userInfo');

  const [token, setToken] = useState(initialToken);
  const [userInfo, setUserInfo] = useState(JSON.parse(initialUserInfo));

  const [loading, setLoading] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState('');

  return (
    <UserContext.Provider value={{ token, setToken, userInfo, setUserInfo, loading, setLoading }}>  
      <PercentageContext.Provider value={{ progressPercentage, setProgressPercentage}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/today" element={<Today/>}></Route>
                <Route path="/habits" element={<Habits/>}></Route>
                <Route path="/history"element={<History/>}></Route>
            </Routes>
        </BrowserRouter>
      </PercentageContext.Provider>
    </UserContext.Provider>
  );
}
