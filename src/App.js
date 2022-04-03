import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import UserContext from "./contexts/UserContext";
import PercentageContext from './contexts/PercentageContext';
import Today from "./components/Today";
import Habits from "./components/Habits/Habits";
import History from "./components/History";
import Login from './components/Home/Login';
import Register from './components/Home/Register';

export default function App() {

  const initialToken = localStorage.getItem('token');
  //const initialUserInfo = localStorage.getItem('userInfo');

  const [token, setToken] = useState(initialToken);
  const [userInfo, setUserInfo] = useState({});

  const [loading, setLoading] = useState(false);
  const [progressBar, setProgressBar] = useState('');

  return (
    <UserContext.Provider value={{ token, setToken, userInfo, setUserInfo, loading, setLoading }}>  
      <PercentageContext.Provider value={{ progressBar, setProgressBar}}>
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
