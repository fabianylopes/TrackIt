import { Container, Body, Date, Habits, Habit, HabitName, Text, Check }from './style';
import { useState, useEffect, useContext } from 'react';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import Menu from '../Menu';
import Header from '../Header';
import UserContext from '../../contexts/UserContext';
import PercentageContext from '../../contexts/PercentageContext';
import check from '../../assets/check.png';
import PercentProgress from '../PercentProgress';
import api from '../../services/api';

export default function Today() {
    let date = dayjs().locale('pt-br').format('dddd, DD/MM');

    const { progressPercentage, setProgressPercentage } = useContext(PercentageContext);
    const { token } = useContext(UserContext);

    const [dayHabits, setdayHabits] = useState([]);
    const [doneNumber, setDoneNumber] = useState([]);


    function loadHabits(){

        const promise = api.getTodayHabits(token);
    
        promise.then(response => setdayHabits(response.data));
        promise.catch(error => console.log(error));
    }

    useEffect(loadHabits, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleCheck(id){

        if(doneNumber.includes(id)){
            setDoneNumber(doneNumber.filter(f => (f === id) ? false : true));
        } else {
            setDoneNumber([...doneNumber, id]);
        }
        
        const promise = api.checkHabit(id, token);

        promise.then(() => loadHabits());
        promise.catch(error => console.log(error.response.data.message));

    }

    return (
        <Container>
            <Header/>
            <Body>
                <Date>{date}</Date>
                <PercentProgress 
                    done={doneNumber.length} 
                    total={dayHabits.length} 
                    percent={progressPercentage} 
                    setPercent={setProgressPercentage}
                />

                {dayHabits.map(({ id, done, name, currentSequence, highestSequence }) => 
                    
                <Habits key={id}>
                    <Habit>
                        <HabitName>{name}</HabitName>
                        <Text>Sequência atual: {currentSequence} dias</Text>
                        <Text>Seu recorde: {highestSequence} dias</Text>
                    </Habit>
                    <Check 
                        done={done}
                        $color={doneNumber.includes(id)} 
                        onClick={() => handleCheck(id)}>
                        <img src={check} alt="check-icon"/>
                    </Check>
                </Habits>
                
                )}

            </Body>
            <Menu/>
        </Container>
    );
}
