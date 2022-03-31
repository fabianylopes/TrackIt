import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import styled from "styled-components";
import Header from './Header';
import Menu from "./Menu";
import check from '../assets/check.png';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import UserContext from '../contexts/UserContext';

export default function Today() {
    let date = dayjs().locale('pt-br').format('dddd, DD/MM');

    const { token } = useContext(UserContext);

    const [colorCheck, setColorCheck] = useState(false);
    const [dayHabits, setdayHabits] = useState([]);
    const [progress, setProgress] = useState(null);

    const [doneNumber, setDoneNumber] = useState([]);

  

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);

        promise.then(handleSuccess);
        promise.catch(error => console.log(error));
    });

    function handleSuccess(response){
        setdayHabits(response.data);
    }


    function handleProgress(id){

        if(doneNumber.includes(id)){
            setDoneNumber(doneNumber.filter(f => (f === id) ? false : true));
        } else {
            setDoneNumber([...doneNumber, id]);
        }

    }

    console.log(doneNumber);

    function Progress(){
        return doneNumber.length === 0 ? 
        (
            <SubTitulo color={colorCheck}>Nenhum hábito concluído ainda</SubTitulo>
        ) : (
            <SubTitulo color={colorCheck}>67% dos hábitos concluídos</SubTitulo>          
        )
    }


    return (
        <Container>
            <Header/>
            <Body>
                <Titulo>{date}</Titulo>
                <Progress/>

                    {dayHabits.map(({ id, name, currentSequence, highestSequence}) => 
                        
                    <Habitos>
                        <Texto>
                            <Habito>{name}</Habito>
                            <P>Sequência atual: {currentSequence} dias</P>
                            <P>Seu recorde: {highestSequence} dias</P>
                        </Texto>
                        <Check 
                            color={doneNumber.includes(id)} 
                            onClick={() => handleProgress(id)}>
                            <img src={check} alt="check-icon"/>
                        </Check>
                    </Habitos>
                    
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

const Titulo = styled.h2`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 23px;
    color: #126BA5;
    padding-bottom: 17px;
`

const SubTitulo = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: ${({ color }) => !color ? '#BABABA' : '#8FC549'};
    margin-bottom: 28px;
`

const Habitos = styled.div`
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

const Texto = styled.div`
    padding-left: 15px;
`

const Habito = styled.p`
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