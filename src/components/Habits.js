import { useState, useContext } from 'react';
import axios from "axios";
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import AddHabit from './AddHabit';
import MyHabits from './MyHabits';
import UserContext from '../contexts/UserContext';

export default function Habits(){

    const { token } = useContext(UserContext);

    const config = {headers: {Authorization: `Bearer ${token}`}}

    const [openForm, setOpenForm] = useState(false);
    const [habits, setHabits] = useState([]);

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    function getHabits(){

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        
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
const Container = styled.div`
    width: 375px;
    height: 100vh;
    padding-top: 70px;
    padding-bottom: 70px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Body = styled.div`
    width: 375px;
    height: 100vh;
    background-color: #E5E5E5;
    padding-top: 98px;
    padding-bottom: 170px;
    padding-left: 17px;
    padding-right: 18px;
`

const Top = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.h2`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 23px;
    color: #126BA5;
    padding-bottom: 17px;
`

const Plus = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    color: #fff;
    font-size: 27px;
    border: none;
    border-radius: 4.6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;    
`
