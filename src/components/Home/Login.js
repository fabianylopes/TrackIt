import { Container, Form, Input, Button, StyledLink } from '../Home/style';
import { useContext} from 'react';
import { useNavigate } from 'react-router';
import UserContext from '../../contexts/UserContext';
import Logo from '../../assets/logo.png';
import api from '../../services/api';
import Loading from '../Loading';

export default function Login() {
  const navigate = useNavigate();

  const { setToken, userInfo, setUserInfo, loading, setLoading } = useContext(UserContext);

/*   useEffect(() => {
    if(token){
      navigate('/today');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps */

  const body = {
    email: userInfo.email,
    password: userInfo.password
  }

  function handleLogin(e){
    e.preventDefault();
    setLoading(true);
    
    const promise = api.login(body);

    promise.then(handleSuccess);
    promise.catch(handleFailure);

  }

  function handleSuccess(response){
    setToken(response.data.token);
    setUserInfo(response.data);
   
    /* localStorage.setItem('token', response.data.token);
    localStorage.setItem('userInfo', JSON.stringify(response.data)); */

    navigate('/today');
  }
  
  function handleFailure(error){
    setLoading(false);
    alert(`${error.response.data.message}!
    Preencha os campos corretamente!`);
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

