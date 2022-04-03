import { Container, Body, Top, Title, Plus } from './style';
import { useState, useContext } from 'react';
import PercentageContext from '../../contexts/PercentageContext';
import Header from '../Header';
import Menu from '../Menu';
import AddHabit from './AddHabit';
import MyHabits from './MyHabits';

export default function Habits(){

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
    
    const { progressBar } = useContext(PercentageContext);

    const [openForm, setOpenForm] = useState(false);
   
    return (
        <Container>
            <Header/>
                <Body>
                    <Top>
                        <Title>Meus hábitos</Title>
                        <Plus onClick={() => setOpenForm(true)}>+</Plus>
                    </Top>

                    {openForm && <AddHabit weekDays={weekDays} setOpenForm={setOpenForm}/>}

                    <MyHabits weekDays={weekDays}/>

                </Body>                
            <Menu progressBar={progressBar}/>
        </Container>
    );
}
