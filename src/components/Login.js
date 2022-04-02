import { useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import Logo from '../assets/logo.png';
import styled from "styled-components";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import Loading from './Loading';

export default function Login() {
  const navigate = useNavigate();

  const { token, setToken, userInfo, setUserInfo, loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    if(token){
      navigate('/today');
    }
  }, []);

  function handleLogin(e){
    e.preventDefault();

    setLoading(true);
    
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      {
        email: userInfo.email,
        password: userInfo.password
      }
    );

    promise.then(handleSuccess);
    promise.catch(handleFailure);

  }

  function handleSuccess(response){
    setToken(response.data.token);
    setUserInfo(response.data);
   
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userInfo', JSON.stringify(response.data));

    navigate('/today');
  }
  
  function handleFailure(error){
    setLoading(false);
    alert(error.response.data.message);
    alert(`${error}! Preencha corretamente os campos!`);
    setUserInfo({});
  }

  return (
    <Container>
      <img src={Logo} alt="logo" />

      <Form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="email" 
            disabled={loading} 
            handleLoading={loading}
            value={userInfo.email || ''}
            onChange={e => setUserInfo({...userInfo, email: e.target.value})}
            required
          >
          </Input>

          <Input 
            type="password" 
            placeholder="senha" 
            disabled={loading} 
            handleLoading={loading}
            value={userInfo.password || ''} 
            onChange={e => setUserInfo({...userInfo, password: e.target.value})}
            required
            >          
          </Input>
          
          <Button 
            type="submit"
            disabled={loading} 
            handleLoading={loading}  
          >
            {loading ? <Loading/> : 'Entrar'}
          </Button>

      </Form>
      <StyledLink to="/register">Não tem uma conta? Cadastre-se!</StyledLink>
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

const Form = styled.form`
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
    opacity: ${(props) => props.handleLoading ? 0.7 : 1};
    cursor: ${(props) => props.handleLoading ?  'not-allowed' : 'pointer'};
`

const StyledLink = styled(Link)`
    font-family: 'Lexend Deca';
    color: #52B6FF;
    font-size: 14px;
    font-weight: 400;
    text-decoration-line: underline;
`
