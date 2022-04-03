import { Container, Body, Date, Habits, Habit, HabitName, Text, Check }from './style';
import { useState, useEffect, useContext } from 'react';
import PercentageContext from '../../contexts/PercentageContext';
import UserContext from '../../contexts/UserContext';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import PercentProgress from '../PercentProgress';
import Menu from '../Menu';
import Header from '../Header';
import check from '../../assets/check.png';
import api from '../../services/api';

export default function Today() {
    let date = dayjs().locale('pt-br').format('dddd, DD/MM');

    const { progressPercentage, setProgressPercentage } = useContext(PercentageContext);
    const { token } = useContext(UserContext);

    const [dayHabits, setdayHabits] = useState([]);
    const [doneNumber, setDoneNumber] = useState([]);


    function loadHabits(){

        const promise = api.getTodayHabits(token);
    
        promise.then(handleSuccess);
        promise.catch(error => console.log(error));
    }

    function handleSuccess(response){
        setdayHabits(response.data);
        setDoneNumber(response.data.length);
    }

    useEffect(loadHabits, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleCheck(id, done){

        if(doneNumber.includes(id)){
            setDoneNumber(doneNumber.filter(f => (f === id) ? false : true));
        } else {
            setDoneNumber([...doneNumber, id]);
        }

        if(done){
            const promise = api.uncheckHabit(id, token);

            promise.then(() => loadHabits());

            return;
        }
        
        const promise = api.checkHabit(id, token);

        promise.then(() => loadHabits());
        promise.catch(error => console.log(error.response.data.message));

    }

    console.log(doneNumber);


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
                        onClick={() => handleCheck(id, done)}>
                        <img src={check} alt="check-icon"/>
                    </Check>
                </Habits>
                
                )}

            </Body>
            <Menu/>
        </Container>
    );
}
