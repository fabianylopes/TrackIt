import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import styled from "styled-components";
import Header from './Header';
import Menu from "./Menu";
import check from '../assets/check.png';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import UserContext from '../contexts/UserContext';
import PercentageContext from '../contexts/PercentageContext';

export default function Today() {
    let date = dayjs().locale('pt-br').format('dddd, DD/MM');

    const { progressPercentage, setProgressPercentage } = useContext(PercentageContext);
    const { token } = useContext(UserContext);

    const [dayHabits, setdayHabits] = useState([]);

    const [doneNumber, setDoneNumber] = useState([]);

    const config = {headers: {Authorization: `Bearer ${token}`}}

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then(handleSuccess);
        promise.catch(error => console.log(error));

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleSuccess(response){
        setdayHabits(response.data);
    }


    function handleProgress(id){

        if(doneNumber.includes(id)){
            setDoneNumber(doneNumber.filter(f => (f === id) ? false : true));
        } else {
            setDoneNumber([...doneNumber, id]);
        }

        const config = {headers: {Authorization: `Bearer ${token}`}}
        
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, '', config);

        promise.then(response => console.log(response));
        promise.catch(error => console.log(error.response.data.message));

    }

    function PercentProgress(){

        if(doneNumber.length  === 0){
            setProgressPercentage(0);
        }
        
        setProgressPercentage((doneNumber.length / dayHabits.length) * 100);
        
        return (
            <Text color={progressPercentage}>
                {doneNumber.length  === 0 ? 
                'Nenhum hábito concluído ainda' : 
                `${progressPercentage.toFixed(2)}% dos hábitos concluídos`}
            </Text>
        );
    }

    return (
        <Container>
            <Header/>
            <Body>
                <Date>{date}</Date>
                <PercentProgress/>

                    {dayHabits.map(({ id, done, name, currentSequence, highestSequence }) => 
                        
                    <Habits key={id}>
                        <Habit>
                            <HabitName>{name}</HabitName>
                            <P>Sequência atual: {currentSequence} dias</P>
                            <P>Seu recorde: {highestSequence} dias</P>
                        </Habit>
                        <Check 
                            done={done}
                            color={doneNumber.includes(id)} 
                            onClick={() => handleProgress(id)}>
                            <img src={check} alt="check-icon"/>
                        </Check>
                    </Habits>
                    
                    )}

            </Body>
            <Menu/>
        </Container>
    );
}

const Container = styled.div`
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
    padding-bottom: 70px;
    padding-left: 17px;
`

const Date = styled.h2`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 23px;
    color: #126BA5;
    padding-bottom: 17px;
`

const Text = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: ${({ color }) => color === 0 ? '#BABABA' : '#8FC549'};
    margin-bottom: 28px;
`

const Habits = styled.div`
    width: 340px;
    height: 94px;
    background-color: #fff;
    border-radius: 5px;
    padding-right: 13px;
    margin-bottom: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Habit = styled.div`
    padding-left: 15px;
`

const HabitName = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #666666;
    padding-bottom: 6px;
`

const P = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #666666;
    padding-bottom: 2px;
`

const Check = styled.button`
    width: 70px;
    height: 70px;
    background-color: ${({ color }) => !color ? '#EBEBEB' : '#8FC549'};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
`