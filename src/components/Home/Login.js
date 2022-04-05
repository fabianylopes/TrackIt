import { Container, Form, Input, Button, StyledLink } from '../Home/style';
import { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router';
import * as Loader from "react-loader-spinner";
import UserContext from '../../contexts/UserContext';
import Logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Login() {
  const navigate = useNavigate();

  const { token, setToken, setUserInfo } = useContext(UserContext);

  const [formInfo, setFormInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(token){
      navigate('/today');
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleLogin(e){
    e.preventDefault();
    setLoading(true);

    api.login(formInfo).then(handleSuccess).catch(handleFailure);
    
  }

  function handleSuccess(response){
    setToken(response.data.token);
    setUserInfo(response.data);
   
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  
  function handleFailure(error){
    setLoading(false);
    alert(`${error.response.data.message}!\nPreencha os campos corretamente!`);
    setFormInfo({});
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
            value={formInfo.email || ''}
            onChange={e => setFormInfo({...formInfo, email: e.target.value})}
            required
          >
          </Input>

          <Input 
            type="password" 
            placeholder="senha" 
            disabled={loading} 
            handleLoading={loading}
            value={formInfo.password || ''} 
            onChange={e => setFormInfo({...formInfo, password: e.target.value})}
            required
            >          
          </Input>
          
          <Button 
            type="submit"
            disabled={loading} 
            handleLoading={loading}  
          >
            {loading ? <Loader type="ThreeDots" color="#ffffff" height={50} width={50} /> : 'Entrar'}
          </Button>

      </Form>
      <StyledLink to="/register">Não tem uma conta? Cadastre-se!</StyledLink>
    </Container>
  );
}
