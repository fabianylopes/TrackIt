import { Container, Body, Top, Title, Plus } from './style';
import { useState, useContext, useEffect } from 'react';
import PercentageContext from '../../contexts/PercentageContext';
import UserContext from '../../contexts/UserContext';
import Header from '../Header';
import Menu from '../Menu';
import AddHabit from './AddHabit';
import MyHabits from './MyHabits';
import api from '../../services/api';

export default function Habits(){

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    const { token } = useContext(UserContext);
    const { progressBar } = useContext(PercentageContext);

    const [openForm, setOpenForm] = useState(false);
    const [habits, setHabits] = useState([]);
   
    function loadHabits(){
        const promise = api.listHabits(token);
        
        promise.then(response => setHabits(response.data));
        promise.catch(error => console.log(error));
    }

    useEffect(() => loadHabits(), []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container>
            <Header/>
                <Body>
                    <Top>
                        <Title>Meus hábitos</Title>
                        <Plus onClick={() => setOpenForm(true)}>+</Plus>
                    </Top>

                    {openForm && <AddHabit weekDays={weekDays} setOpenForm={setOpenForm} loadHabits={loadHabits}/>}

                    <MyHabits weekDays={weekDays} habits={habits} loadHabits={loadHabits}/>

                </Body>                
            <Menu progressBar={progressBar}/>
        </Container>
    );
}
