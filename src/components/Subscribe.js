import { useContext } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import axios from "axios";
import styled from "styled-components";
import Logo from '../assets/logo.png';
import UserContext from '../contexts/UserContext';
import Loading from './Loading';

export default function Subscribe() {
    const navigate = useNavigate();
       
    const { userInfo, setUserInfo, loading, setLoading } = useContext(UserContext);

    function handleSubscribe(e){
        e.preventDefault();

        setLoading(true);

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        {
            email: userInfo.email,
            name: userInfo.name,
            image: userInfo.image,
            password: userInfo.password
        });

        promise.then(handleSuccess);
        promise.catch(handleFailure);
    }

    function handleSuccess(){
        navigate('/');
      }
      
      function handleFailure(error){
        console.log(error)
        alert(error.response.data.message);
        setLoading(false);
        alert(`${error}! Preencha corretamente os campos!`);
        setUserInfo({});
      }

    return (
        <Container>
            <img src={Logo} alt="logo"></img>
            <Form onSubmit={handleSubscribe}>
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

                <Input 
                    type="text" 
                    placeholder="nome" 
                    disabled={loading} 
                    handleLoading={loading}
                    value={userInfo.name || ''} 
                    onChange={e => setUserInfo({...userInfo, name: e.target.value})} 
                    required
                    >
                </Input>
                
                <Input 
                    type="url" 
                    placeholder="foto" 
                    disabled={loading} 
                    handleLoading={loading}
                    value={userInfo.image || ''} 
                    onChange={e => setUserInfo({...userInfo, image: e.target.value})} 
                    required
                    >
                </Input>
                
                <Button 
                    type="submit" 
                    disabled={loading} 
                    handleLoading={loading}
                >
                    {loading ? <Loading/> : 'Cadastrar'}
                </Button>
            </Form>
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
