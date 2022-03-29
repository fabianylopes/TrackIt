import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import axios from "axios";
import styled from "styled-components";
import Logo from '../assets/logo.png';

export default function Subscribe() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({name: '', email: '', image: '', password: ''});


    function handleSubscribe(){

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        {
            email: userInfo.email,
            name: userInfo.name,
            image: userInfo.image,
            password: userInfo.password
        });

        promise.then(navigate('/'));
        promise.catch(error => console.log(error));
    }

    return (
        <Container>
            <img src={Logo} alt="logo"></img>
            <Input type="email" placeholder="email" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} ></Input>
            <Input type="password" placeholder="senha" value={userInfo.password} onChange={e => setUserInfo({...userInfo, password: e.target.value})} ></Input>
            <Input type="text" placeholder="nome" value={userInfo.name} onChange={e => setUserInfo({...userInfo, name: e.target.value})} ></Input>
            <Input type="url" placeholder="foto" value={userInfo.image} onChange={e => setUserInfo({...userInfo, image: e.target.value})} ></Input>
            <Button type="submit" onClick={handleSubscribe}>
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
