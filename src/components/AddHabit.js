import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import styled from "styled-components";
import axios from "axios";
import Loading from './Loading';


export default function AddHabit({ form, setForm }){
    
    const { token, loading, setLoading } = useContext(UserContext);
    
    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
        

    const [habitName, setHabitName] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    
    function selectDay(day){
        
        if(selectedDays.includes(day)){
            setSelectedDays(selectedDays.filter(f => (f === day) ? false : true));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
        
    }
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const body = {
        name: habitName,
        days: selectedDays
    }

    function handleHabit(e){
        e.preventDefault();

        setLoading(true);

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);

        promise.then(handleSuccess);
        promise.catch(handleFailure);
    }

    function handleSuccess(){
        setHabitName('');
        setSelectedDays([]);
        setForm(!form)
    }

    function handleFailure(error){
        setHabitName('');
        alert(error.response.data.message);
        setLoading(false);
    }

    return (
        <NewHabit>
        <Input 
            disabled={loading}
            type="text" 
            placeholder="nome do hábito" 
            value={habitName} 
            onChange={e => setHabitName(e.target.value)}
            handleLoading={loading}
        >    
        </Input>

        <Week>
            {weekDays.map((day, index) => 
                <WeekDay
                    disabled={loading}
                    key={index}
                    days={selectedDays.includes(index)}
                    onClick={() => selectDay(index)}>{day}
                </WeekDay>
            )}
        </Week>

        <CreateHabit>
            <Cancel onClick={() => setForm(!form)} handleLoading={loading} disabled={loading}>Cancelar</Cancel>
            <Salvar onClick={handleHabit} handleLoading={loading} disabled={loading}>
                
                {loading ? <Loading/> : 'Salvar'}
                
                
            </Salvar>
        </CreateHabit>

        </NewHabit>  
    );
}

const NewHabit = styled.div`
    width: 340px;
    height: 180px;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 18px;
`

const Input = styled.input`
    width: 303px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 400;
    outline: 0;
    background-color: ${(props) => props.handleLoading ? "#F2F2F2" : "#FFFFFF"};
    color: ${(props) => props.handleLoading ? "#AFAFAF" : "#000"};
    ::placeholder{
        color: #DBDBDB;
    }
`

const Cancel = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    background-color: #fff;
    color: #52B6FF;
    width: 70px;
    height: 20px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-right: 23px;
    opacity: ${(props) => props.handleLoading ? 0.7 : 1};
`
const Salvar = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    background-color: #52B6FF;
    color: #fff;
    width: 84px;
    height: 35px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    opacity: ${(props) => props.handleLoading ? 0.7 : 1};
`

const CreateHabit = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`

const Week = styled.div`
    margin-top: 8px;
`

const WeekDay = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${({days}) => days ? '#DBDBDB' : '#fff'};
    color: ${({days}) => days ? '#fff' : '#DBDBDB'};
    border: 1px solid #D5D5D5;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    margin-right: 4px;
    margin-bottom: 30px;
    cursor: pointer;
`
