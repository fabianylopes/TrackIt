import { useState, useContext} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import Logo from '../assets/logo.png';
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();

  const { setToken } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({email: '', password: ''})

  function handleLogin(){
    
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
    {
      email: userInfo.email,
	    password: userInfo.password
    });

    promise.then(handleSuccess);
    promise.catch(handleFailure);

  }

  function handleSuccess(response){
    navigate('/today');
    setToken(response.data);
  }

  function handleFailure(error){
    alert(error.response.data.message);
  }


  return (
    <Container>
      <img src={Logo} alt="logo" />
        <Input type="email" placeholder="email" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})}></Input>
        <Input type="password" placeholder="senha" value={userInfo.password} onChange={e => setUserInfo({...userInfo, password: e.target.value})}></Input>
        <Button type="submit" onClick={handleLogin}>
            Entrar
        </Button>
      <StyledLink to="/subscribe">Não tem uma conta? Cadastre-se!</StyledLink>
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