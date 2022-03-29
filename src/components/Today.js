import { useState } from 'react';
import styled from "styled-components";
import Header from './Header';
import Menu from "./Menu";
import check from '../assets/check.png';
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'

export default function Today() {

    let date = dayjs().locale('pt-br').format('dddd, DD/MM');

    const [colorCheck, setColorCheck] = useState(false);

  return (
    <Container>
        <Header/>
        <Body>
            <Titulo>{date}</Titulo>
            <SubTitulo>Nenhum hábito concluído ainda</SubTitulo>
            <Habitos>
                <Texto>
                    <Habito>Ler 1 capítulo de livro</Habito>
                    <P>Sequência atual: 3 dias</P>
                    <P>Seu recorde: 5 dias</P>
                </Texto>
                <Check color={colorCheck} onClick={() => setColorCheck(!colorCheck)}>
                    <img src={check} alt="check-icone"/>
                </Check>
            </Habitos>
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
    color: #BABABA;
    margin-bottom: 28px;
`

const Habitos = styled.div`
    width: 340px;
    height: 94px;
    background-color: #fff;
    border-radius: 5px;
    padding-right: 13px;
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