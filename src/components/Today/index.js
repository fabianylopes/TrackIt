import { Container, Body, Date, Habits, Habit, HabitName, Subtitle, Text, CurrentDays, Record, Check }from './style';
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
    const [doneNumber, setDoneNumber] = useState(0);

    useEffect(() => loadHabits(), []); // eslint-disable-line react-hooks/exhaustive-deps

    function loadHabits(){

        const promise = api.getTodayHabits(token);
    
        promise.then(response => {
            setdayHabits(response.data);  

            const doneHabits = response.data.filter(habit => habit.done);
            
            setDoneNumber(doneHabits.length);
            updateProgressBar(doneHabits.length, response.data.length);
        });

        promise.catch(error => console.log(error));
    }

    function updateProgressBar(done, total){

        if(done  === 0){
            setProgressBar(0);
        }  

        setProgressBar((done / total) * 100);

    }


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

    return (
        <Container>
            <Header/>
            <Body>
                <Date>{date}</Date>

                <Subtitle done={doneNumber}>
                    {doneNumber  === 0 ? 
                    'Nenhum hábito concluído ainda' : 
                    `${progressBar.toFixed(0)}% dos hábitos concluídos`}
                </Subtitle>

                {dayHabits.map(({ id, done, name, currentSequence, highestSequence }) => 
                    
                <Habits key={id}>
                    <Habit>
                        <HabitName>{name}</HabitName>
                        <Text>Sequência atual: </Text>
                        <CurrentDays current={currentSequence}>{currentSequence} dias</CurrentDays>
                        <Text>Seu recorde:</Text>
                        <Record current={currentSequence} record={highestSequence}>{highestSequence} dias</Record>
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
