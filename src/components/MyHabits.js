import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import styled from "styled-components";
import Delete from '../assets/delete.png';
import UserContext from '../contexts/UserContext';

export default function MyHabits(){

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    const { token } = useContext(UserContext);

    const [habits, setHabits] = useState([])

    useEffect(() => {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

		const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
		
        promise.then(handleSuccess);
        promise.catch(error => console.log(error.response));

	}, []);

    function handleSuccess(response){
        setHabits(response.data);
    }

    console.log(habits);

    return (
        <MeusHabitos>

            {habits.map((habit, index) => {
                return (
                    <>
                         <Lixeira>
                            <SubTitulo>{habit.name}</SubTitulo>
                            <img src={Delete} alt="delete-icon"></img>
                        </Lixeira>
                        
                        <Week>
                            {weekDays.map(weekday => 
                            <WeekDay 
                                >{weekday}
                            </WeekDay>
                            )}
                        </Week>
                    
                    </>
                );
            })}

           
        </MeusHabitos>  
    );
}

const SubTitulo = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 20   px;
    color: #666;
    margin-bottom: 8px;
`
const MeusHabitos = styled.div`
    width: 340px;
    height: 90px;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 13px 10px 15px 14px;
`

const Week = styled.div`
    margin-top: 8px;
`

const WeekDay = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: #fff;
    color: #666;
    border: 1px solid #D5D5D5;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    margin-right: 4px;
    margin-bottom: 30px;
    cursor: pointer;
`

const Lixeira = styled.div`
    display: flex;
    justify-content: space-between;
    img {
        width: 13px;
        height: 15px;
        cursor: pointer;
    }
`