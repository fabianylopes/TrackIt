import { Container, Body, Top, Title, Plus } from './style';
import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import Menu from '../Menu';
import AddHabit from './AddHabit';
import MyHabits from './MyHabits';
import api from '../../services/api';
import Header from '../Header';

export default function Habits(){

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
    
    const { token } = useContext(UserContext);

    const [openForm, setOpenForm] = useState(false);
    const [habits, setHabits] = useState([]);

    function getHabits(){

        const promise = api.listHabits(token);
        
        promise.then(response => setHabits(response.data));
        promise.catch(error => console.log(error));
        
    }

    return (

        <Container>
            <Header/>
                <Body>
                    <Top>
                        <Title>Meus hábitos</Title>
                        <Plus onClick={() => setOpenForm(true)}>+</Plus>
                    </Top>

                    {openForm && <AddHabit weekDays={weekDays} setOpenForm={setOpenForm}/>}

                    <MyHabits loadHabits={getHabits} habits={habits} weekDays={weekDays}/>

                </Body>                
            <Menu/>
        </Container>

    );
}
