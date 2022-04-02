import { useContext } from 'react';
import axios from "axios";
import styled from "styled-components";
import Trashcan from '../assets/delete.png';
import UserContext from '../contexts/UserContext';

export default function MyHabits({ weekDays,loadHabits, habits }){

    const { token } = useContext(UserContext);

    const config = {headers: {Authorization: `Bearer ${token}`}}

    loadHabits();

    function deleteHabit(id){
        // eslint-disable-next-line no-restricted-globals
        const confirmDelete = confirm('Deseja realmente deletar este hábito?');

        if(confirmDelete){

            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
            
            promise.then(loadHabits);
            promise.catch(error => console.log(error))
        }
    }

    if(habits.length === 0){
        return (
            <Text>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Text>
        );
    }

    return (
        <>
            {habits.map(({id, name, days}) => {
                return (
                    <Habits key={id}>
                         <Title>
                            <HabitName>{name}</HabitName>
                            <img src={Trashcan} alt="delete-icon" onClick={() => deleteHabit(id)}/>
                        </Title>
                        
                        <Week>
                            {weekDays.map((day, index) => 
                            <WeekDay key={index}
                                daysColor={days.includes(index)}
                            >{day}
                            </WeekDay>)}
                        </Week>                    
                    </Habits>
                );
            })}
        </>  
    );
}

const HabitName = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #666;
    margin-bottom: 8px;
`

const Habits = styled.div`
    width: 340px;
    height: 90px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 13px 10px 15px 14px;
`

const Week = styled.div`
    margin-top: 8px;
`

const WeekDay = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${({daysColor}) => daysColor ? '#DBDBDB' : '#fff'};
    color: ${({daysColor}) => daysColor ? '#fff' : '#DBDBDB'};
    border: 1px solid #D5D5D5;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    margin-right: 4px;
    margin-bottom: 30px;
`

const Title = styled.div`
    display: flex;
    justify-content: space-between;
    img {
        width: 13px;
        height: 15px;
        cursor: pointer;
    }
`

const Text = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #666;
    margin-bottom: 28px;
`
