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
import Loading from '../Loading';

export default function Today() {
    let date = dayjs().locale('pt-br').format('dddd, DD/MM');

    const { progressBar, setProgressBar } = useContext(PercentageContext);
    const { token } = useContext(UserContext);

    const [dayHabits, setdayHabits] = useState([]);
    const [doneNumber, setDoneNumber] = useState([]);

    useEffect(() => loadHabits(), []); // eslint-disable-line react-hooks/exhaustive-deps

    function loadHabits(){

        const promise = api.getTodayHabits(token);
    
        promise.then(response => {
            setdayHabits(response.data);  

            setDoneNumber(dayHabits.filter(habit => habit.done));
            updateProgressBar(doneNumber.length, dayHabits.length);
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

    if(dayHabits.length === 0){
        return <Loading color={'#52B6FF'}/>
    }

    return (
        <Container>
            <Header/>
            <Body>
                <Date>{date}</Date>

                <Subtitle done={doneNumber.length}>
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
