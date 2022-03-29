import { useState } from 'react';
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
//import AddHabit from './AddHabit';

export default function Habits(){

    const [form, setForm] = useState(false);

    function showForm(){
        if(!form){
            setForm(!form);
          }
    }

    return (
        <Container>
            <Header/>
            <Body>
                <Habitos>
                    <Titulo>Meus hábitos</Titulo>
                    <Plus onClick={showForm}>+</Plus>
                </Habitos>

                {/* {form && <AddHabit />} */}

                <SubTitulo>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</SubTitulo>
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
    padding-right: 18px;
`

const Habitos = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Titulo = styled.h2`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 23px;
    color: #126BA5;
    padding-bottom: 17px;
`

const Plus = styled.button`
    font-family: 'Lexend Deca', sans-serif;
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    color: #fff;
    font-size: 27px;
    border: none;
    border-radius: 4.6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;    
`

const SubTitulo = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #666;
    margin-bottom: 28px;
`