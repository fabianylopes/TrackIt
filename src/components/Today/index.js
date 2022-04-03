import { Container, Body, Date, Habits, Habit, HabitName, Subtitle, Text, Check }from './style';
import { useState, useEffect, useContext } from 'react';
import PercentageContext from '../../contexts/PercentageContext';
import UserContext from '../../contexts/UserContext';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import Menu from '../Menu';
import Header from '../Header';
import check from '../../assets/check.png';
import api from '../../services/api';

export default function Today() {
    let date = dayjs().locale('pt-br').format('dddd, DD/MM');

    const { progressBar, setProgressBar } = useContext(PercentageContext);
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

        if(done){
            const promise = api.uncheckHabit(id, token);

            promise.then(() => loadHabits());

            return;
        }
        
        const promise = api.checkHabit(id, token);

        promise.then(() => loadHabits());
        promise.catch(error => console.log(error.response.data.message));

    }

    /* if(dayHabits.done){
        setDoneNumber(doneNumber.filter(f => (f === id) ? false : true));
    } else {
        setDoneNumber([...doneNumber, dayHabits.id]);
    } 
    
        if(doneNumber.length  === 0){
        setProgressBar(0);
    }
    
    setProgressBar((doneNumber.length / dayHabits.length) * 100);
    
    */


    return (
        <Container>
            <Header/>
            <Body>
                <Date>{date}</Date>

                <Subtitle Textcolor={progressBar}>
                    {doneNumber.length  === 0 ? 
                    'Nenhum hábito concluído ainda' : 
                    `${progressBar.toFixed(0)}% dos hábitos concluídos`}
                </Subtitle>

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
            <Menu progressBar={progressBar}/>
        </Container>
    );
}
