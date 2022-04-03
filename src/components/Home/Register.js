import { Container, Form, Input, Button, StyledLink } from '../Home/style';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import UserContext from '../../contexts/UserContext';
import Loading from '../Loading';
import Logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Register() {
    const navigate = useNavigate();
       
    const { userInfo, setUserInfo, loading, setLoading } = useContext(UserContext);

    function handleRegister(e){
        e.preventDefault();
        setLoading(true);

        const body = 
        {
            email: userInfo.email,
            name: userInfo.name,
            image: userInfo.image,
            password: userInfo.password
        }

        const promise = api.register(body);

        promise.then(() => navigate('/'));
        promise.catch(handleFailure);
    }

    function handleFailure(error){
        setLoading(false);
        alert(`${error.response.data.message}!
        Preencha os campos corretamente!`);
        setUserInfo({});
    }

    return (
        <Container>
            <img src={Logo} alt="logo"></img>
            <Form onSubmit={handleRegister}>
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
                    {loading ? <Loading color={'#fff'}/> : 'Cadastrar'}
                </Button>
            </Form>
            <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
        </Container>
    );
}
