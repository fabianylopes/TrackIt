import { Container, Form, Input, Button, StyledLink } from '../Home/style';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as Loader from "react-loader-spinner";
import Logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Register() {
    const navigate = useNavigate();

    const [formInfo, setFormInfo] = useState({});
    const [loading, setLoading] = useState(false);

    function handleRegister(e){
        e.preventDefault();
        setLoading(true);

        api.register(formInfo).then(handleSuccess).catch(handleFailure);
    }

    function handleSuccess(){
        navigate('/')
        setLoading(false);
    }

    function handleFailure(error){
        alert(`${error.response.data.message}!\nPreencha os campos corretamente!`);
        setFormInfo({});
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

                <Input 
                    type="text" 
                    placeholder="nome" 
                    disabled={loading} 
                    handleLoading={loading}
                    value={formInfo.name || ''} 
                    onChange={e => setFormInfo({...formInfo, name: e.target.value})} 
                    required
                    >
                </Input>
                
                <Input 
                    type="url" 
                    placeholder="foto" 
                    disabled={loading} 
                    handleLoading={loading}
                    value={formInfo.image || ''} 
                    onChange={e => setFormInfo({...formInfo, image: e.target.value})} 
                    required
                    >
                </Input>
                
                <Button 
                    type="submit" 
                    disabled={loading} 
                    handleLoading={loading}
                >
                    {loading ? <Loader type="ThreeDots" color="#ffffff" height={50} width={50} /> : 'Cadastrar'}
                </Button>
            </Form>
            <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
        </Container>
    );
}
