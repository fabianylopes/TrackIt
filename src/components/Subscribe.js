import { useState } from 'react';
import { Link } from "react-router-dom";
//import { useNavigate } from 'react-router';
//import axios from "axios";
import styled from "styled-components";
import Logo from '../assets/logo.png';

export default function Subscribe() {
    //const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');

  return (
    <Container>
        <img src={Logo}></img>
        <Input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} ></Input>
        <Input type="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} ></Input>
        <Input type="text" placeholder="nome" value={name} onChange={e => setName(e.target.value)} ></Input>
        <Input type="url" placeholder="foto" value={image} onChange={e => setImage(e.target.value)} ></Input>
        <Button>
            Cadastrar
        </Button>
        <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
    </Container>
  );
}

const Container = styled.div`
    padding-top: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`

const Input = styled.input`
    width: 303px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    padding-left: 10px;
    outline: 0;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 400;
    background-color: ${(props) => props.handleLoading ? "#F2F2F2" : "#FFFFFF"};
    color: ${(props) => props.handleLoading ? "#AFAFAF" : "#000"};
    
    ::placeholder{
        color: #DBDBDB;
    }
`

const Button = styled.button`
    background-color: #52B6FF;
    color: #fff;
    width: 303px;
    height: 45px;
    border: none;
    border-radius: 4px;
    font-size: 21px;
    cursor: pointer;
    opacity: ${(props) => props.handleLoading ? 0.7 : 1};
`

const StyledLink = styled(Link)`
    font-family: 'Lexend Deca';
    color: #52B6FF;
    font-size: 14px;
    font-weight: 400;
    text-decoration-line: underline;
`
